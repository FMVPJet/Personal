import Image from "next/image";

import { siteConfig } from "@/config/site";

export default function AboutSection() {
  return (
    <section aria-labelledby="who-i-am-title" className="g-about-long-page" id="about">
      <div className="g-about-content" id="main-content">
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
            <h2 id="who-i-am-title">Who I am</h2>
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
      </div>
    </section>
  );
}
