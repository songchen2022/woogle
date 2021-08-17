/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { Spinner } from '@woocommerce/components';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import recordEvent from '.~/utils/recordEvent';
import './index.scss';

/**
 * Renders a Button component with extra props.
 *
 * Set `loading` to `true` and it will render a disabled Button with a loading spinner indicator.
 *
 * Set `eventName` and upon `onClick` it will call `recordEvent` with provided `eventName` and `eventProps`.
 *
 * ## Usage
 *
 * ```jsx
 * <AppButton loading>
 * 		Click Me
 * </AppButton>
 * ```
 *
 * @param {*} props Props to be forwarded to {@link Button}.
 * @param {boolean} [props.loading] If true, the button will be disabled and will display a loading spinner indicator beside the button text.
 */
const AppButton = ( props ) => {
	const {
		className,
		disabled,
		loading,
		eventName,
		eventProps,
		text: passedInText,
		onClick = () => {},
		...rest
	} = props;

	const handleClick = ( ...args ) => {
		if ( eventName ) {
			recordEvent( eventName, eventProps );
		}

		onClick( ...args );
	};

	const text = [];
	const classes = [ 'app-button', className ];

	if ( loading ) {
		text.push( <Spinner /> );
	}

	if ( passedInText ) {
		text.push( passedInText );

		if ( rest.icon ) {
			classes.push( 'app-button--fix-padding' );
		}
		if ( rest.iconPosition === 'right' ) {
			classes.push( 'app-button--icon-position-right' );
		}
	}

	return (
		<Button
			className={ classnames( ...classes ) }
			disabled={ disabled || loading }
			text={ text.length ? text : undefined }
			onClick={ handleClick }
			{ ...rest }
		/>
	);
};

export default AppButton;
