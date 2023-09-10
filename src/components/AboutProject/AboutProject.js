import React from 'react';
import TextColumn from '../TextColumn/TextColumn';
import SectoinTitle from '../SectoinTitle/SectoinTitle';
function AboutProject() {
  return (
    <section className='about-project'>
      <SectoinTitle text='О проекте' id='about-project' />
      <div className='about-project__columns'>
        <TextColumn
          title='Дипломный проект включал 5 этапов'
          text='Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
       доработки.'
        />
        <TextColumn
          title='На выполнение диплома ушло 5 недель'
          text='У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
          защититься.'
        />
      </div>
      <div className='about-project__stages'>
        <div className='about-project__stage about-project__stage_backend'>
          <p className='about-project__stage-week about-project__stage-week_backend'>1 неделя</p>
          <p className='about-project__stage-caption'>Back-end</p>
        </div>
        <div className='about-project__stage about-project__stage_frontend'>
          <p className='about-project__stage-week about-project__stage-week_frontend'>4 недели</p>
          <p className='about-project__stage-caption'>Front-end</p>
        </div>
      </div>
    </section>
  );
}
export default AboutProject;
