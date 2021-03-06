/**
 * External dependencies
 */
import { controls } from '@wordpress/data-controls';
import { registerStore, useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { getHistory } from '@woocommerce/navigation';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import * as resolvers from './resolvers';
import reducer from './reducer';
import { createErrorResponseCatcher } from './api-fetch-middlewares';
import { getReconnectAccountsUrl } from '.~/utils/urls';

registerStore( STORE_KEY, {
	actions,
	selectors,
	resolvers,
	controls,
	reducer,
} );

apiFetch.use(
	createErrorResponseCatcher( ( response ) => {
		if ( response.status === 401 ) {
			getHistory().replace( getReconnectAccountsUrl() );

			// Inject the status code to let the subsequent handlers can identify the 401 response error.
			return ( response.json || response.text )
				.call( response )
				.then( ( errorInfo ) => {
					if ( typeof errorInfo === 'string' ) {
						return { message: errorInfo };
					}
					return errorInfo;
				} )
				.then( ( errorInfo ) => {
					return Promise.reject( {
						...errorInfo,
						statusCode: response.status,
					} );
				} );
		}

		// Throws error response to subsequent middlewares
		throw response;
	} )
);

export { STORE_KEY };

export const useAppDispatch = () => {
	return useDispatch( STORE_KEY );
};
