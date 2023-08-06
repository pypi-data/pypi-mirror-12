$(function () {
    /* Include the built version of the our templates.  This means that grunt
    * must be run to generate these before the test. */
    girderTest.addCoveredScripts([
        '/static/built/plugins/jobs/templates.js',
        '/plugins/jobs/web_client/js/misc.js',
        '/plugins/jobs/web_client/js/views/JobDetailsWidget.js',
        '/plugins/jobs/web_client/js/views/JobListWidget.js'
    ]);
    girderTest.importStylesheet(
        '/static/built/plugins/jobs/plugin.min.css'
    );

    girder.events.trigger('g:appload.before');
    var app = new girder.App({
        el: 'body',
        parentView: null
    });
    girder.events.trigger('g:appload.after');

    describe('Unit test the job detail widget.', function () {
        it('Show a job detail widget.', function () {
            waitsFor('app to render', function () {
                return $('#g-app-body-container').length > 0;
            });

            runs(function () {
                var job = new girder.models.JobModel({
                    _id: 'foo',
                    title: 'My batch job',
                    status: girder.jobs_JobStatus.INACTIVE,
                    log: 'Hello world\ngoodbye world',
                    updated: '2015-01-12T12:00:00',
                    created: '2015-01-12T12:00:00',
                    when: '2015-01-12T12:00:00'
                });

                var widget = new girder.views.jobs_JobDetailsWidget({
                    el: $('#g-app-body-container'),
                    job: job,
                    parentView: app
                }).render();

                expect($('.g-monospace-viewer[property="kwargs"]').length).toBe(0);
                expect($('.g-monospace-viewer[property="log"]').text()).toBe(job.get('log'));
                expect($('.g-job-info-value[property="_id"]').text()).toBe(job.get('_id'));
                expect($('.g-job-info-value[property="title"]').text()).toBe(job.get('title'));
                expect($('.g-job-info-value[property="when"]').text()).toContain('January 12, 2015');
                expect($('.g-job-status-badge').text()).toContain('Inactive');

                job.on('change', widget.render, widget);
                job.set('status', girder.jobs_JobStatus.SUCCESS);

                expect($('.g-job-status-badge').text()).toContain('Success');
            });
        });
    });

    describe('Unit test the job list widget.', function () {
        it('Show a job list widget.', function () {
            var jobs, rows;

            runs(function () {
                jobs = _.map([1, 2, 3], function (i) {
                    return new girder.models.JobModel({
                        _id: 'foo' + i,
                        title: 'My batch job ' + i,
                        status: i,
                        updated: '2015-01-12T12:00:0' + i,
                        created: '2015-01-12T12:00:0' + i,
                        when: '2015-01-12T12:00:0' + i
                    });
                });

                var widget = new girder.views.jobs_JobListWidget({
                    el: $('#g-app-body-container'),
                    filter: {},
                    parentView: app
                }).render();

                expect($('.g-jobs-list-table>tbody>tr').length).toBe(0);

                // Add the jobs to the collection
                widget.collection.add(jobs);
            });

            waitsFor(function () {
                return $('.g-jobs-list-table>tbody>tr').length === 3;
            }, 'job list to auto-reload when collection is updated')

            runs(function () {
                // Make sure we are in reverse chronological order
                rows = $('.g-jobs-list-table>tbody>tr');
                expect($(rows[0]).text()).toContain('My batch job 3');
                expect($(rows[0]).text()).toContain('Success');
                expect($(rows[1]).text()).toContain('My batch job 2');
                expect($(rows[1]).text()).toContain('Running');
                expect($(rows[2]).text()).toContain('My batch job 1');
                expect($(rows[2]).text()).toContain('Queued');

                // Simulate an SSE notification that changes a job status
                girder.eventStream.trigger('g:event.job_status', {
                    data: _.extend({}, jobs[0].attributes, {
                        status: 4
                    })
                });
            });

            // Table row should update automatically
            waitsFor(function () {
                return $('td.g-job-status-cell', rows[2]).text() === 'Error';
            });
        });
    });
});
