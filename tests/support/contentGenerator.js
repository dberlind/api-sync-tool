'use strict';

var _ = require('lodash');

module.exports = {
  generateBusinessGroups: generateBusinessGroups,
  generateApis: generateApis,
  generateWorkspace: generateWorkspace,
  generateWorkspaceWithFiles: generateWorkspaceWithFiles,
  getWorkspaceFilesMetadata: getWorkspaceFilesMetadata,
  getAPIFilesMetadata: getAPIFilesMetadata
};

function generateBusinessGroups(number) {
  number = number ? number : 10;
  return _.range(1, number + 1)
    .map(function (n) {
      return {
        id: n,
        name: 'bizGroup' + n
      };
    });
}

function generateApis(number) {
  number = number ? number : 10;
  return _.range(1, number + 1)
    .map(function (n) {
      return {
        id: n,
        name: 'api' + n,
        versions: [{
          id: 1,
          name: 'version1'
        }]
      };
    });
}

function generateWorkspace() {
  return {
    api: {
      id: 1234
    },
    apiVersion: {
      id: 1234
    },
    bizGroup: {
      id: 1234
    }
  };
}

function generateWorkspaceWithFiles(number) {
  var workspace = generateWorkspace();
  workspace.files = getWorkspaceFilesMetadata(number);
  return workspace;
}

function getWorkspaceFilesMetadata(number) {
  number = number ? number : 10;
  return _.range(1, number + 1)
    .map(function (n) {
      return {
        path: 'api' + n + '.raml',
        hash: 'asdf' + n
      };
    });
}

function getAPIFilesMetadata(number) {
  number = number ? number : 10;
  return _.range(1, number + 1)
    .map(function (n) {
      return {
        id: n,
        path: 'api' + n + '.raml'
      };
    });
}
