import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import debugLogger from 'ember-debug-logger';
import AlertifyHandler from 'explorviz-frontend/mixins/alertify-handler';
import ModelUpdater from 'explorviz-frontend/utils/model-update';


export default Service.extend(AlertifyHandler, Evented, {

  store: service(),
  landscapeRepo: service("merged-landscape-repository"),
  landscapeListener: service('landscape-listener'),

  debug: debugLogger(),
  modelUpdater: null,

  init() {
    this._super(...arguments);
    if (!this.get('modelUpdater')) {
      this.set('modelUpdater', ModelUpdater.create(getOwner(this).ownerInjection()));
    }
  },

  /**
   * Loads a landscape from the backend and triggers a visualization update
   * @method loadLandscapeById
   * @param {*} timestamp
   */
  loadMergedLandscapeByTimestamps(timestamp1, timestamp2) {
    const self = this;

    self.debug("Start import merged landscape-request");



    self.get('store').queryRecord('merged-landscape', { timestamp1: timestamp1, timestamp2: timestamp2 }).then(success, failure).catch(error);

    function success(landscape) {
      console.log("Importing landscapes: " + [timestamp1, timestamp2]);

      // Pause the visulization
      self.get('modelUpdater').addDrawableCommunication();

      self.set('landscapeRepo.latestLandscape', landscape);
      self.get('landscapeRepo').triggerLatestLandscapeUpdate();

      self.debug("end import merged landscape-request");
    }

    function failure(e) {
      self.set('landscapeRepo.latestLandscape', undefined);
      self.showAlertifyMessage("Landscape couldn't be requested!" +
        " Backend offline?");
      self.debug("Landscape couldn't be requested!", e);
    }

    function error(e) {
      self.set('landscapeRepo.latestLandscape', undefined);
      self.debug("Error when fetching landscape: ", e);
    }
  },

  loadHistoryByTimestamps(timestamps) {
    const self = this;

    self.debug("Start import history");

    self.get('store').queryRecord('history', { timestamps: timestamps}).then(success, failure).catch(error);

    function success(history) {
      self.set('landscapeRepo.latestHistory', history);
      self.debug("end import history request");
    }

    function failure(e) {
      self.set('landscapeRepo.latestHistory', undefined);
      self.showAlertifyMessage("History couldn't be requested!" +
        " Backend offline?");
      self.debug("History couldn't be requested!", e);
    }

    function error(e) {
      self.set('landscapeRepo.latestHistory', undefined);
      self.debug("Error when fetching history: ", e);
    }
  }

});
