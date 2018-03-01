import URI from 'urijs';
import API from '../../../../../../../../common/API';
import {
  FETCH_V2V_SOURCE_CLUSTERS,
  FETCH_V2V_TARGET_CLUSTERS
} from './MappingWizardClustersStepConstants';

import {
  requestSourceClustersData,
  requestTargetClustersData
} from './mappingWizardClustersStep.fixtures';

const mockMode = true;

const _getSourceClustersActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_SOURCE_CLUSTERS,
    payload: API.get(url)
  }).catch(error => {
    // redux-promise-middleware will automatically send:
    // FETCH_V2V_SOURCE_CLUSTERS_PENDING, FETCH_V2V_SOURCE_CLUSTERS_FULFILLED, FETCH_V2V_SOURCE_CLUSTERS_REJECTED

    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    if (mockMode) {
      dispatch({
        type: `${FETCH_V2V_SOURCE_CLUSTERS}_FULFILLED`,
        payload: requestSourceClustersData.response
      });
    }
  });

export const fetchSourceClustersAction = url => {
  const uri = new URI(url);
  return _getSourceClustersActionCreator(uri.toString());
};

const _getTargetClustersActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_TARGET_CLUSTERS,
    payload: API.get(url)
  }).catch(error => {
    // redux-promise-middleware will automatically send:
    // FETCH_V2V_TARGET_CLUSTERS_PENDING, FETCH_V2V_TARGET_CLUSTERS_FULFILLED, FETCH_V2V_TARGET_CLUSTERS_REJECTED

    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    if (mockMode) {
      dispatch({
        type: `${FETCH_V2V_TARGET_CLUSTERS}_FULFILLED`,
        payload: requestTargetClustersData.response
      });
    }
  });

export const fetchTargetClustersAction = url => {
  const uri = new URI(url);
  return _getTargetClustersActionCreator(uri.toString());
};