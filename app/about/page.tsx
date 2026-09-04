import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import GalleryShell from "@/components/gallery-shell";
import { pageConfig, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.name} — ${siteConfig.role}, research, experience, and education.`,
};

const news = [
  { date: "2024/04/01", text: "Released a new personal website." },
  { date: "2023/11/15", text: "Started a new role at iFLYTEK." },
  {
    date: "2023/08/18",
    text: "Patent “An Image Processing Method, Device, Equipment and Storage Medium” was published.",
    href: "https://worldwide.espacenet.com/patent/search/family/086876285/publication/CN116342434A?q=pn%3DCN116342434A",
  },
  { date: "2023/08/03", text: "Released a new personal website." },
];

const education = [
  {
    school: "Guangdong University of Technology",
    location: "Guangzhou, China",
    degree: "M.Eng. in Electronic and Communication Engineering",
    period: "2019 — 2022",
    detail: "School of Information Engineering",
    supervisor: (
      <>
        Supervisor: Prof. {" "}
        <a className="g-link" href="https://yzw.gdut.edu.cn/info/1088/1334.htm" rel="noopener" target="_blank">
          Qingyun Dai
        </a>
      </>
    ),
  },
  {
    school: "Huanghe S & T University",
    location: "Zhengzhou, China",
    degree: "B.Eng. in Electronic and Communication Engineering",
    period: "2015 — 2019",
    detail: "School of Information Engineering",
  },
];

const experience = [
  {
    company: "iFLYTEK",
    location: "Zhengzhou, China",
    role: "Computer Vision Algorithm Engineer · R&D Department",
    period: "Nov 2023 — Present",
    focus: "Image segmentation and object detection.",
  },
  {
    company: "Zhengzhou Xinda Institute of Advanced Technology",
    location: "Zhengzhou, China",
    role: "Algorithm Engineer · Technology R&D Department",
    period: "Mar 2023 — Nov 2023",
    focus: "Object detection, image segmentation, and multi-modal fusion.",
  },
  {
    company: "CASIVISION TECH LUOYANG CO LTD",
    location: "Luoyang, China",
    role: "Algorithm Engineer · Algorithm Research Institute",
    period: "Jul 2022 — Mar 2023",
    focus: "Visual algorithms for an industrial defect detection project.",
  },
];

const skills = [
  {
    title: "Computer Vision",
    detail: "Image segmentation · Object detection · Multi-modal fusion · Deep learning",
  },
  {
    title: "Development",
    detail: "Python · PyTorch · OpenCV · C++ · MATLAB",
  },
  {
    title: "Delivery",
    detail: "Model deployment · Project operation and maintenance · AI development and operations",
  },
];

const patents = [
  {
    title: "An Image Processing Method, Device, Equipment and Storage Medium",
    publication: "CN116342434A",
    authors: "Jiangtao Guo, Changxin Hu; Dan Li, et al.",
    organization: "CASIVISION TECH BEIJING CO LTD · CASIVISION TECH LUOYANG CO LTD · 2023/06",
    href: "https://worldwide.espacenet.com/patent/search/family/086876285/publication/CN116342434A?q=pn%3DCN116342434A",
  },
  {
    title: "View-independent Feature Disentanglement Based on Contrastive Learning",
    publication: "CN113743499A",
    authors: "Jiangtao Guo, Jiangzhong Cao; Qingyun Dai, et al.",
    organization: "Guangdong University of Technology · 2021/12",
    href: "https://worldwide.espacenet.com/patent/search/family/078735157/publication/CN113743499A?q=pn%3DCN113743499A",
  },
  {
    title: "Controllable Image Generation Based on Principal Component Analysis in Latent Space",
    publication: "CN113743499A",
    authors: "Qiliang Zhou, Jiangzhong Cao; Qingyun Dai, Yuqin Lu, Jiangtao Guo, et al.",
    organization: "Guangdong University of Technology · 2021/07",
    href: "https://worldwide.espacenet.com/patent/search?q=pn%3DCN113361659A",
  },
  {
    title: "Multi-view Generation Method Based on Contrastive Learning",
    publication: "CN112598775A",
    authors: "Yuqin Lu, Jiangzhong Cao, Qingyun Dai, Qiliang Zhou, Jiangtao Guo, et al.",
    organization: "Guangdong University of Technology · 2020/12",
    href: "https://worldwide.espacenet.com/patent/search/family/075200250/publication/CN112598775A?q=pn%3DCN112598775A",
  },
];

export default function AboutPage() {
  return (
    <GalleryShell>
      <div className="g-page-action-left" data-tooltip="Back to Works">
        <div className="g-page-action-wrap parallax-wrap">
          <Link aria-label="Back to portfolio" className="g-about-back parallax-element" href="/">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </Link>
        </div>
      </div>
      <main className="g-about-long-page">
        <section className="g-about-hero g-page-heading" id="hero">
          <div className="g-about-hero-styles parallax-onscroll" id="hero-styles">
            <div id="hero-caption">
              <div className="inner">
                <p className="g-page-heading-kicker">{siteConfig.name} / ABOUT</p>
                <h1 className="hero-title g-page-heading-title">{pageConfig.about.titlePrefix} {siteConfig.name}</h1>
                <h2 className="hero-subtitle g-page-heading-subtitle">{pageConfig.about.subtitle}</h2>
              </div>
            </div>
          </div>
        </section>

        <div className="g-about-content" id="main-content">
          <section className="g-about-row g-about-welcome g-about-centered">
            <p className="has-animation" data-delay="10">
              Welcome
            </p>
            <h3 className="has-animation" data-delay="100">
              I build computer vision systems that move from deep learning research to reliable,
              deployable products.
            </h3>
          </section>

          <section className="g-about-row g-about-bio">
            <div className="g-about-photo has-animation" data-delay="100">
              <Image
                alt={`${siteConfig.name} profile photo`}
                height={1080}
                src="/assets/images/profile/me.jpg"
                width={1080}
              />
            </div>
            <div className="g-about-bio-copy has-animation" data-delay="150">
              <h4>Who I am</h4>
              <p>
                I&apos;m {siteConfig.name} — based in <strong>{siteConfig.location}</strong>. I am an
                engineer with a strong background in AI and ML, with a strong foundation in deep
                learning.
              </p>
              <p>
                I am proficient in Python, PyTorch, OpenCV, C++, and MATLAB. Alongside developing
                AI models, I work with model deployment, project operation and maintenance, and AI
                development and operations.
              </p>
              <p>
                <strong>Currently:</strong> {siteConfig.role} at {siteConfig.affiliation}, focused
                on image segmentation and object detection.
              </p>
              <hr />
              <p className="g-about-links">
                <a className="g-link" href={siteConfig.links.email}>
                  Email
                </a>
                <span>·</span>
                <a className="g-link" href={siteConfig.links.linkedin} rel="noopener" target="_blank">
                  LinkedIn
                </a>
                <span>·</span>
                <a className="g-link" href={siteConfig.links.github} rel="noopener" target="_blank">
                  GitHub
                </a>
              </p>
            </div>
          </section>

          <section className="g-about-row g-about-small-row">
            <div className="g-about-section-heading">
              <h4>News</h4>
            </div>
            <div className="g-about-news has-animation" data-delay="10">
              {news.map((item) => (
                <p key={`${item.date}-${item.text}`}>
                  <strong>[{item.date}]</strong>{" "}
                  {item.href ? (
                    <a className="g-link" href={item.href} rel="noopener" target="_blank">
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </p>
              ))}
            </div>
          </section>

          <section className="g-about-row g-about-small-row">
            <div className="g-about-section-heading">
              <h4>Education</h4>
            </div>
            <div className="g-about-timeline has-animation" data-delay="10">
              {education.map((item) => (
                <article className="g-about-timeline-row" key={item.school}>
                  <div className="g-about-period">{item.period}</div>
                  <div>
                    <h5>{item.school}</h5>
                    <p>{item.degree}</p>
                    <p>{item.detail} · {item.location}</p>
                    {item.supervisor && <p>{item.supervisor}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="g-about-row g-about-small-row">
            <div className="g-about-section-heading">
              <h4>Experience</h4>
            </div>
            <div className="g-about-timeline has-animation" data-delay="10">
              {experience.map((item) => (
                <article className="g-about-timeline-row" key={`${item.company}-${item.period}`}>
                  <div className="g-about-period">{item.period}</div>
                  <div>
                    <h5>{item.role}</h5>
                    <p>{item.company} · {item.location}</p>
                    <p>Focus: {item.focus}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="g-about-row g-about-card-row g-about-centered">
            <h4 className="has-animation" data-delay="10">Skills</h4>
            <hr />
            <div className="g-about-cards">
              {skills.map((skill, index) => (
                <article className="g-about-card has-animation" data-delay={100 + index * 50} key={skill.title}>
                  <div className="g-about-card-icon" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                  <h5>{skill.title}</h5>
                  <p>{skill.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="g-about-row g-about-small-row">
            <div className="g-about-section-heading">
              <h4>Research</h4>
            </div>
            <div className="g-about-research has-animation" data-delay="10">
              <h5>Learning invariant and uniformly distributed feature space for multi-view generation</h5>
              <p>Yuqin Lu, Jiangzhong Cao, Shengfeng He, <strong>Jiangtao Guo</strong>, Qiliang Zhou, and Qingyun Dai</p>
              <p><em>Information Fusion, 2023</em> · <a className="g-link" href="https://doi.org/10.1016/j.inffus.2023.01.011" rel="noopener" target="_blank">Paper link</a> · <a className="g-link" href={siteConfig.links.scholar} rel="noopener" target="_blank">Google Scholar</a></p>
            </div>
          </section>

          <section className="g-about-row g-about-small-row">
            <div className="g-about-section-heading">
              <h4>Patents</h4>
            </div>
            <div className="g-about-timeline g-about-patent-list has-animation" data-delay="10">
              {patents.map((patent) => (
                <article className="g-about-timeline-row" key={`${patent.publication}-${patent.title}`}>
                  <div className="g-about-period">{patent.publication}</div>
                  <div>
                    <h5><a className="g-link" href={patent.href} rel="noopener" target="_blank">{patent.title}</a></h5>
                    <p>{patent.authors}</p>
                    <p><em>{patent.organization}</em></p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="g-about-row g-about-cta g-about-centered">
            <hr />
            <h3 className="has-animation" data-delay="10">Notes on engineering, models, and the work around them.</h3>
            <p className="has-animation" data-delay="50">I write about the small tools and decisions that make projects easier to ship.</p>
            <Link className="g-about-button g-link has-animation" data-delay="100" href="/blog">
              Read the blog →
            </Link>
            <hr />
          </section>
        </div>
      </main>
    </GalleryShell>
  );
}
