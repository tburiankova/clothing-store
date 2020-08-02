import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner.component';

const CollectionsOverviewContainer = lazy(() =>
  import('../../components/collections-overview/collections-overview.container')
);
const CollectionPageContainer = lazy(() =>
  import('../collection/collection.container')
);

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

// // observables solution
// this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
//   async (snapshot) => {
//     const collectionsMap = convertCollectionsSnapshotToMap(snaps));
//     updateCollections(collectionsMap);
//     this.setState({ loading: false });
//   }
// );

// // rest solution
// fetch(
//   'https://firestore.googleapis.com/v1/projects/crwn-db-cba57/databases/(default)/documents/collections'
// )
//   .then((response) => response.json())
//   .then((collections) => console.log(collections));

// // promised based solution - moved to shop.types (thunk)
// collectionRef.get().then((snapshot) => {
//   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//   updateCollections(collectionsMap);
//   this.setState({ loading: false });
// });
