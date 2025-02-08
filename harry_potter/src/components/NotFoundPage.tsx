import { useNavigate } from 'react-router';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="notfound-container">
        <h1 className="notfound-title">Page not found</h1>
        <button
          className="notfound-button"
          type="button"
          onClick={() => navigate('/')}
        >
          Main page
        </button>
      </div>
    </>
  );
}

export default NotFoundPage;
