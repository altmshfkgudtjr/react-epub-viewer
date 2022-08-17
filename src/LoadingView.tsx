import { CSSProperties } from 'react';

const LoadingView = () => {
  return (
    <div style={LoadingWrapper}>
      <div style={Wrapper}>
        <div style={Content}>Loading</div>
      </div>
    </div>
  );
};

const LoadingWrapper: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Wrapper: CSSProperties = {
  width: '100%',
  height: '30px',
  margin: '30px 0px',
  textAlign: 'center',
};

const Content: CSSProperties = {
  display: 'inline-block',
  width: 'auto',
  height: '24px',
  color: '#3972ff',
  padding: '0 8px',
  borderBottom: '3px solid #3972ff',
};

export default LoadingView;
