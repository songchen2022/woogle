/**
 * External dependencies
 */
import { Modal } from '@wordpress/components';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './index.scss';

const AppModal = ( props ) => {
	const { buttons = [], className, children, ...rest } = props;

	return (
		<Modal className={ classnames( 'app-modal', className ) } { ...rest }>
			{ children }
			{ buttons.length >= 1 && (
				<div className="app-modal__footer">{ buttons }</div>
			) }
		</Modal>
	);
};

export default AppModal;
