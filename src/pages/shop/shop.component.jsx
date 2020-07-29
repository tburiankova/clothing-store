import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

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
