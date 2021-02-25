/**
 * External dependencies
 */
import { controls } from '@wordpress/data-controls';
import { registerStore, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import * as resolvers from './resolvers';
import reducer from './reducer';

registerStore( STORE_KEY, {
	actions,
	selectors,
	resolvers,
	controls,
	reducer,
} );

export { STORE_KEY };

export const useAppDispatch = () => {
	return useDispatch( STORE_KEY );
};
