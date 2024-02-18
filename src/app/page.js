import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";

export default async function Home() {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const result = await res.json();

  const memesData = result.data.memes;


  return (
    <main className="">
      <div className="">
        <div className="h-10 flex justify-center bg-slate-500 mb-5">
          <h1 className="text-center my-auto font-bold">Memes generator</h1>

        </div>
        
        <div className="images flex flex-wrap justify-center ">

          {memesData.map((item) => {
            return <>
              <Link href={`/generate/${item.id}`}>
                <div key={item.id} className="imgDiv h-60 w-60 m-2.5">
                <Image className="mainImg h-48 w-48 hover:h-52" src={item.url} width={200} height={200} alt="" />


                </div>
              </Link>
            </>
          })}
          <div className="footer text-white">
                    <h1 >Developed by <strong><Link href="https://www.facebook.com/profile.php?id=100053927520168">Ashfaq Ahmed </Link></strong></h1>
            </div>
        </div>
      </div>
    </main>
  );
}
