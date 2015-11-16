/**
 * Created by sahand on 11/8/15.
 */
if (Meteor.isServer) {
	Meteor.methods({
		createDecisionPoint: function(name, id, descr, req, type) {
			DecisionPoints.insert({
				name: name,
				_id: id,
				description: descr,
				requirements: req,
				decisionPointType: type
			}, function(error) {
				if (!error) {
					console.log("created decision point");
				}
			});
		},
		deleteDecisionPoint: function (id) {
			DecisionPoints.remove(id);
		}
	})
}

if (Meteor.isClient) {

	Meteor.subscribe("exitSurveys");
	Meteor.subscribe("quitSurveys");

	Template.adminDecisionPointsInterior.helpers({
		decisionPoints: function () {
			// find all decisions, sorted by id
			return DecisionPoints.find({}, {sort: {_id: 1}});
		}
	});

	Template.adminDecisionPointsInterior.events({
		"submit #createDecision": function (event) {

			event.preventDefault();

			var form = event.target;

			Meteor.call("createDecisionPoint", form.name.value, form.id.value, form.description.value, form.requirements.value, form.type.value);
		},
		"click .deleteSolution": function () {
			Meteor.call("deleteSolution", this._id);
		}
	});

	Template.decisionPreview.events({
		"click .delete": function () {
			Meteor.call("deleteDecisionPoint", this._id);
		}
	});
}