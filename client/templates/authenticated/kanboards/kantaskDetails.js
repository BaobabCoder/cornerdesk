Template.kantaskDetails.events({
    'click [name="close-kantask-details"]' (event, template) {
        Session.set('selectedTask', null);
        Modal.hide('kantaskModal');
    },
    'click [name="save-task"]' (event, template) {
        Meteor.call('updateTask', template.task.get()._id, {
            $set: {
                description: template.find('[name="task-description"]').value,
                color: template.find('#task-color').value,
            }
        });
    }
});

Template.kantaskDetails.helpers({
    task() {
        return Template.instance().task.get();
    }
});

Template.kantaskDetails.onCreated(() => {
    let template = Template.instance();
    template.task = new ReactiveVar();
    Tracker.autorun(() => {
        template.task.set(Kantasks.findOne(Session.get('selectedTask')));
    });
});

Template.kantaskDetails.onRendered(() => {
    let template = Template.instance();
    autosize(template.find('textarea'));
});