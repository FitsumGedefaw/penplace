import Image from "next/image";
import Link from "next/link";
import HomepagePic from "./undraw_publish_article_re_3x8h.svg";
export default function Home() {
  return (
    <main>
      <div className="flex justify-between gap-4 items-center">
        <Image src={HomepagePic} alt="Dojo helpdesk logo" quality={100} />

        <div className="w-3/6">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
            repellendus tempore, exercitationem odit, quasi doloremque possimus
            recusandae alias sequi totam soluta natus iure eius, obcaecati sint
            dolores blanditiis aspernatur quo officia iusto ut. Et, aliquid sed
            voluptates iste cum totam, facere explicabo, fugit suscipit ratione
            aspernatur consequuntur ex mollitia quaerat?
          </p>

          <div className="flex justify-center my-8">
            <Link href="/blogs">
              <button className="btn-primary">View blogs</button>
            </Link>
          </div>
        </div>
      </div>

      <h2 className="mt-12">Company Updates</h2>

      <div className="card">
        <h3>New member of the web dev team...</h3>
        <p className="line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at
          quam. Dolores omnis possimus quam soluta rerum illo laborum ullam
          pariatur molestiae, modi beatae corrupti.
        </p>
      </div>
      <div className="card">
        <h3>New website live!</h3>
        <p className="line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at
          quam. Dolores omnis possimus quam soluta rerum illo laborum ullam
          pariatur molestiae, modi beatae corrupti, assumenda distinctio
          adipisci, cupiditate minima eum vitae? Similique dicta est facilis
          debitis, autem temporibus quo repellat illum unde id iste veritatis
          eveniet, aspernatur enim quas.
        </p>
      </div>
    </main>
  );
}
