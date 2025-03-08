import {
  potterApi,
  updateDetailedId,
  updatePageNumber,
  updatePageSize,
  updateSerchTerm,
} from '$/components';
import { wrapper } from '$/components';
import { MainPage } from '$/components/pages_templates';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    if (context.resolvedUrl.includes('details')) {
      const detailedCardId = context.query['details'] as string;
      store.dispatch(updateDetailedId(detailedCardId));
      await store.dispatch(
        potterApi.endpoints.getCharacterById.initiate(detailedCardId, {
          forceRefetch: true,
          subscribe: true,
        })
      );
    }

    const state = store.getState();
    let pageNumber = Number(context.query['page']);
    let pageSize = Number(context.query['pageSize']);
    console.log(pageSize, 'pagesize');
    let searchTerm = context.query['search'] as string;
    if (!pageNumber) {
      pageNumber = state.potterData.pageNumber;
    }
    if (!pageSize) {
      pageSize = state.potterData.pageSize;
    }
    if (!searchTerm) {
      searchTerm = state.potterData.searchTerm;
    }

    store.dispatch(updatePageNumber(pageNumber));
    store.dispatch(updatePageSize(pageSize));
    store.dispatch(updateSerchTerm(searchTerm));

    await store.dispatch(
      potterApi.endpoints.getCharacters.initiate({
        searchTerm,
        pageNumber,
        pageSize,
      })
    );
    await Promise.all(store.dispatch(potterApi.util.getRunningQueriesThunk()));
    return { props: {} };
  }
);

function AppPage() {
  return <MainPage />;
}

export default AppPage;
