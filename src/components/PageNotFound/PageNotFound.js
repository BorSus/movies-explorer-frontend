import { useNavigate } from 'react-router-dom';

function PageNotFound({ code, info }) {
  const navigate = useNavigate();

  return (
    <section className='page-not-found'>
      <p className='page-not-found__code'>{code}</p>
      <p className='page-not-found__info'>{info}</p>
      <button onClick={() => navigate(-1)} className='page-not-found__back'>
        Назад
      </button>
    </section>
  );
}
export default PageNotFound;
