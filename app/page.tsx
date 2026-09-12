import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import EcgTrace from "@/components/EcgTrace";
import Masthead from "@/components/Masthead";
import RecordEntry from "@/components/RecordEntry";
import Section from "@/components/Section";
import {
  education,
  experience,
  languages,
  profile,
  projects,
  publication,
  skills,
} from "@/content/cv";

export default function Home() {
  return (
    <>
      <Masthead name={profile.name} />

      <div className="hero">
        <div className="wrap hero-in">
          <div>
            <div className="eyebrow">{profile.eyebrow}</div>
            <h1>
              Fazla Rabbi
              <br />
              Somrat
            </h1>
            <p className="role">
              Web developer and deep-learning researcher. I build production
              websites — and train{" "}
              <b>
                convolutional networks that read cardiac disease off paper ECG
                printouts
              </b>
              .
            </p>
            <ul className="facts">
              {profile.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <div className="cta-row">
              <a className="btn btn-solid" href={`mailto:${profile.email}`}>
                Email Somrat
              </a>
              <a className="btn btn-ghost" href={profile.cvFile} download>
                Download CV (PDF)
              </a>
              <a className="btn btn-ghost" href="#research">
                Read the ECG paper
              </a>
            </div>
          </div>

          <figure className="card-photo">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={413}
              height={531}
              priority
            />
            <figcaption className="card-cap">
              <span>{profile.location}</span>
              <span>2026</span>
            </figcaption>
          </figure>
        </div>

        <div className="wrap">
          <EcgTrace />
        </div>
      </div>

      <main className="wrap">
        <section id="focus">
          <div className="split">
            <div className="field">Focus</div>
            <p className="lede">{profile.focus}</p>
          </div>
        </section>

        <Section id="research" title="Research" count="1 peer-reviewed publication">
          <article className="paper">
            <p className="venue">{publication.indexed}</p>
            <h3>{publication.title}</h3>
            <p className="authors">
              {publication.authors.map((author, index) => (
                <span key={author}>
                  {author === profile.name ? <b>{author}</b> : author}
                  {index < publication.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <dl className="paper-meta">
              {publication.meta.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="nets">
              {publication.networks.map((net) => (
                <li key={net}>{net}</li>
              ))}
            </ul>
          </article>
        </Section>

        <Section id="experience" title="Experience" count="Remote · UK & US clients">
          {experience.map((entry) => (
            <RecordEntry key={entry.title} entry={entry} />
          ))}
        </Section>

        <Section id="project" title="Project" count="Undergraduate main project">
          {projects.map((entry) => (
            <RecordEntry key={entry.title} entry={entry} />
          ))}
        </Section>

        <Section id="skills" title="Skills" count="Research & software development">
          <div className="skills">
            {skills.map((block) => (
              <div className="skill" key={block.group}>
                <h3>{block.group}</h3>
                <ul>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education" count="2012 — 2022">
          {education.map((entry) => (
            <RecordEntry key={entry.title} entry={entry} />
          ))}
        </Section>

        <Section id="languages" title="Languages" count="Bangla — mother tongue">
          <div className="lang-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">English (CEFR)</th>
                  {languages.columns.map((column) => (
                    <th scope="col" key={column}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Self-assessed level</th>
                  {languages.levels.map((level, index) => (
                    <td className="lvl" key={languages.columns[index]}>
                      {level}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="scale">{languages.scale}</p>
        </Section>

        <section id="contact" className="contact">
          <div className="sec-head">
            <h2>Get in touch</h2>
          </div>
          <p className="lede">
            Open to research collaborations, MSc supervision conversations, and
            remote web development work.
          </p>

          <div className="form-wrap">
            <ContactForm to={profile.email} />
            <dl className="direct">
              <div className="ch">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </dd>
              </div>
              <div className="ch">
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
                </dd>
              </div>
              <div className="ch">
                <dt>Based in</dt>
                <dd>
                  <span>{profile.location}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="colophon">
            <span>{profile.name} — portfolio</span>
            <span>Set in Archivo, Source Serif 4 &amp; IBM Plex Mono</span>
          </div>
        </section>
      </main>
    </>
  );
}
