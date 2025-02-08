import RepositoryApp from 'src/components/apps/repository/index.tsx';
// import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp.tsx';

// const BCrumb = [
//   {
//     to: '/',
//     title: 'Home',
//   },
//   {
//     title: 'Repository',
//   },
// ];
const RepositoryPage = () => {
  return (
    <>
      {/* <BreadcrumbComp title="Knowledge Base" items={BCrumb} /> */}
      <RepositoryApp />
    </>
  );
};

export default RepositoryPage;
