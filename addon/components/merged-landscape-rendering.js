import LandscapeRendering from 'explorviz-frontend/components/visualization/rendering/landscape-rendering';
import layout from '../templates/components/merged-landscape-rendering';
import { inject as service } from "@ember/service";

/**
 *Enable entering the application perspective from the landscape perspective.
 * @class Merged-Landscape-Rendering-Component
 * @extends Landscape-Rendering-Component
 */
export default LandscapeRendering.extend({
  layout,
  reloadHandler: service("reload-handler"),
  renderingService: service("rendering-service"),
  mergedRepo: service("merged-repository"),

  initInteraction(){
    this._super(...arguments);
    const self = this;

    this.get('interaction').on('showApplication', function(emberModel) {
      self.set('viewImporter.importedURL', null);
      self.set('mergedRepo.mergedApplication', emberModel);
    });
  }
});
