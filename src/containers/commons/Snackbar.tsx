import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
// components
import Snackbar from 'components/commons/Snackbar'
// lib
import zIndex from 'lib/styles/zIndex'
import media from 'lib/styles/media'
// slices
import { deleteSnackbar } from 'slices/snackbar'
// types
import { RootState } from 'slices'
import { SnackbarState } from 'slices/snackbar'


const SnackbarWrapper = ()=> {
  const dispatch = useDispatch();
	const snackbar = useSelector<RootState, SnackbarState>(state => state.snackbar);
	

	const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		dispatch(deleteSnackbar());
	};

	
	return (
		<Container>
			{snackbar.text !== '' && <Snackbar onClick={onClick} 
                                         text={snackbar.text} 
                                         type={snackbar.type} />}
		</Container>
	);
}

const Container = styled.div`
	position: fixed;
	top: 40px;
	right: 30px;
	width: 320px;
	height: auto;
	z-index: ${zIndex.snackbar};

	${media.small} {
		width: 100%;
		top: initial;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
`;

export default SnackbarWrapper