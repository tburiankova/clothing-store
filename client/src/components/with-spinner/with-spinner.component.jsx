import React from 'react';

import Spinner from '../spinner/spinner.component';

const WithSpinner = (WrapperComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrapperComponent {...otherProps} />;
};

export default WithSpinner;

// const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
//   return isLoading ? (
//     <SpinnerOverlay>
//       <SpinnerContainer />
//     </SpinnerOverlay>
//   ) : (
//     <WrappedComponent {...otherProps} />
//   );
// };
