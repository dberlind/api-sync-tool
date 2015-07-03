'use strict';

module.exports = function (workspaceRepository, errors) {
  return function validateSetupDoneStrategy() {
    return workspaceRepository.get()
      .then(function (workspace) {
        if (!workspace.bizGroup || !workspace.api || !workspace.apiVersion) {
          return Promise.reject(new errors.SetupNeededError());
        }
      });
  };
};