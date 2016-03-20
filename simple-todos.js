Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    // Only runs on client
    Template.body.helpers({
        tasks: function() {
            return Tasks.find({}, {sort: {createdAt: -1 }});
        }
    });
    
    Template.body.events({
        "submit .new-task": function(event) {
            // Prevent default browser form submit
            event.preventDefault();
            
            // Get value from form element
            var text = event.target.text.value;
            console.log(event.target.text);
            
            // Insert a task into the Collection
            Tasks.insert({
                text: text,
                createdAt : new Date() 
            });
            
            // Clear form
            event.target.text.value = "";
        }
    })
    
    Template.task.events({
        "click .toggle-checked": function() {
            // Set the checked property to the opposite of its current value
            Tasks.update(this._id, {
                $set: {checked: !this.checked}
            })
        },
        "click .delete": function() {
            Tasks.remove(this._id);
        }
    })
}