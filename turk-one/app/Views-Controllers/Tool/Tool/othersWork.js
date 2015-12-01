/**
 * Created by sahand on 11/23/15.
 */
if (Meteor.isClient) {
	Template.othersWorkImages.helpers({
		// TODO: Turn this helper and the solutions helper on tool into smaller, more specified subscribes instead of subscribes to all of the Solutions collection
		otherSolutions: function () {
			return Solutions.find({
					submitted: true,
					status: {$ne: "rejected"},
					decisionPointId: this._id,
					complexity: {$gt: 1},
					workerId: {$ne: Session.get("ticket")}
				},
				{
					sort: {dateUpdated: -1}
				});
		}
	});

	Template.othersWorkInteractive.helpers({
		// TODO: Turn this helper and the solutions helper on tool into smaller, more specified subscribes instead of subscribes to all of the Solutions collection
		otherSolutions: function () {
			return Solutions.find({
					submitted: true,
					status: {$ne: "rejected"},
					decisionPointId: this._id,
					complexity: {$gt: 1},
					workerId: {$ne: Session.get("ticket")},
				},
				{
					sort: {dateUpdated: -1}
				});
		}
	});

	Template.othersWorkImages.onRendered(function () {
		if (Session.get("savedSet" + Session.get("ticket")) != true) {
			var solutions = Solutions.find({
					submitted: true,
					decisionPointId: this.data._id,
					complexity: {$gt: 1},
					workerId: {$ne: Session.get("ticket")}
				},
				{
					sort: {dateUpdated: -1}
				}).fetch();
			var solutionIds = $.map(solutions, function (s) {
				return s._id
			});
			Meteor.call("logAllSolutionIdsAvailableToWorker", Session.get("ticket"), solutionIds, function (e, r) {
				if (!e) {
					Session.setPersistent("savedSet" + Session.get("ticket"), true);
				} else {
					console.log(e);
				}
			})
		}
	});

	setFlashingSolutionImageViews = function (flashing, message) {
		$.each($(".solutionImageTargetOverlay"), function () {
			if (flashing) {
				$(this).addClass('animated flash infinite');
				$(this).css("display", "block");
			} else {
				$(this).removeClass('animated flash infinite');
				$(this).css("display", "none");
			}
		});
	};

}