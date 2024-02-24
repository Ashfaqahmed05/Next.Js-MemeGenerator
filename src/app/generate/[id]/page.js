"use client"
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import "./style.css"

export default function Detail(props) {
  const [textInputs, setTextInputs] = useState([]);
  const [single, setSingle] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [downloadImg, setDownloadImg] = useState('')


  useEffect(() => {
    fetching();
  }, []);


  function getvalue(index, e) {
    e.preventDefault();
    const value = e.target.value;
    const newTextInputs = [...textInputs];
    newTextInputs[index] = value;
    setTextInputs(newTextInputs);

  }

  async function fetching() {
    const ids = props.params.id;
    const res = await fetch(`https://api.imgflip.com/get_memes`);
    const result = await res.json();
    const memesData = result.data.memes;
    const singleData = memesData.find(item => item.id === ids);
    setSingle(singleData);
    const initialTextInputs = new Array(singleData.box_count).fill('');
    setTextInputs(initialTextInputs);
  }

  async function generate(e) {
    e.preventDefault()
    const res = await fetch(` https://api.imgflip.com/caption_image?template_id=${single.id}&username=Ashfaq12&password=12123434&boxes[0][text]=${textInputs[0]}&boxes[1][text]=${textInputs[1]}&boxes[2][text]=${textInputs[2]}&boxes[3][text]=${textInputs[3]}&boxes[4][text]=${textInputs[4]}`)
    const result = await res.json();
    const img = result.data.url
    setImageUrl(img);
    setDownloadImg(img)
    alert('submitted');
  }

  function dowload() {
    saveAs(downloadImg, 'meme.jpg')
  }




  if (!single) {
    return null;
  }

  const defaultUrl = single.url;

  return (
    <>
      <div>

      </div>
      <div className="h-10 flex justify-center bg-slate-500 mb-5">
        <h1 className="text-center my-auto font-bold">Memes generator</h1>

      </div>

      <div className="container flex justify-evenly flex-wrap">

        <div className="content">
          {single.url && <img className="genImage" src={imageUrl || defaultUrl} alt="" />}
          {downloadImg ?
            <button className="transition ease-in-out delay-150 bg-slate-500  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300  btn..." onClick={dowload}>Download</button>
            : <></>
          }
        </div>
        <div className="inputs">
          <form onSubmit={generate}>
            {textInputs.map((text, index) => (
              <div key={index}>
                <input
                  className="text-black"
                  type="text"
                  onChange={(e) => getvalue(index, e)}
                  placeholder={`Text ${index + 1}`}
                  value={text}
                  required
                />
                <br />
                <br />
              </div>
            ))}
            <button
              type="submit"
              className="transition ease-in-out delay-150 bg-slate-500  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300  btn..."
            >
              Generate
            </button>{" "}
            <br />
          </form>
        </div>
      </div>

    </>
  );
}