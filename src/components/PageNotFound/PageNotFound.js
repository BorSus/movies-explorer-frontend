import { Link } from 'react-router-dom';

function PageNotFound({ code, info }) {
  return (
    <section className='page-not-found'>
      <p className='page-not-found__code'>{code}</p>
      <p className='page-not-found__info'>{info}</p>
      <Link to='/' className='page-not-found__back'>
        Назад
      </Link>
    </section>
  );
}
export default PageNotFound;
