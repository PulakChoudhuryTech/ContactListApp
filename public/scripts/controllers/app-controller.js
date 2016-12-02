angular.module('ContactListApp', [])
.controller('AppCtrl', function($scope, $http) {
	$scope.title = "Contact List App";
	$scope.onAddContact = function() {
		$http.post('/contactList', $scope.contact).then(function(response) {
			$scope.contactList.push(response.data);
			$scope.contact = {};
		});
	};

	$scope.onRemoveContact = function(id) {
		$http.delete('/contactList/' + id).then(function(response) {
			refreshContactList();
		});
	};

	$scope.onSelectEditContact = function(contact) {
		$scope.contact = angular.copy(contact);
	};

	$scope.onUpdateContact = function() {
		$http.put('/contactList/' + $scope.contact._id, $scope.contact).then(function(response) {
			refreshContactList();
		});
	};
	
	$scope.onCearContact = function () {
		$scope.contact = {};
	};

	var refreshContactList = function() {
		$http.get('/contactList').then(function(response) {
			$scope.contactList = response.data;
		}, function(error) {

		});
	}
	var init = function() {
		refreshContactList();
	}
	init();
});