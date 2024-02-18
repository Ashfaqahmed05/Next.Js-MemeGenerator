"use client"
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import "./style.css"

export default function Detail(props) {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [single, setSingle] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [downloadImg, setDownloadImg] = useState('')


    useEffect(() => {
        fetching();
    }, []);


    function getvalue1(e) {
        e.preventDefault();
        const value = e.target.value;
        setText1(value);
    }

    function getvalue2(e) {
        e.preventDefault();
        const value = e.target.value;
        setText2(value);
    }


    async function fetching() {
        const ids = props.params.id;
        const res = await fetch(`https://api.imgflip.com/get_memes`);
        const result = await res.json();
        const memesData = result.data.memes;
        const singleData = memesData.find(item => item.id === ids);
        setSingle(singleData);
    }

    async function generate(e) {
        e.preventDefault()
        const res = await fetch(`https://api.imgflip.com/caption_image?template_id=${single.id}&username=Ashfaq12&password=12123434&text0=${text1}&text1=${text2}`);
        const result = await res.json();
        const img = result.data.url
        setImageUrl(img);
        setDownloadImg(img)
        setText1('')
        setText2('')
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
            <div className="h-10 flex justify-center bg-slate-500 mb-5">
                <h1 className="text-center my-auto font-bold">Memes generator</h1>

            </div>
            <div className="container flex justify-evenly flex-wrap">

                <div className="content">
                    {single.url && <img className="genImage" src={imageUrl || defaultUrl} alt="" />}
                    {downloadImg ?
                        <button className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300  btn..." onClick={dowload}>Download</button>
                        : <></>
                    }
                </div>
                <div className="inputs">
                    <form onSubmit={generate}>
                        
                    <input className="text-black" type="text" onChange={getvalue1} placeholder="Text One" value={text1} required/><br /><br />
                    <input className="text-black" type="text" onChange={getvalue2} placeholder="Text Two" value={text2} required/><br /><br />
                    <button type="submit" className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300  btn...">Generate</button> <br />

                    </form>
                </div>
            </div>
            <div className="footer text-white">
                    <h1 >Developed by <strong><a href="https://www.facebook.com/profile.php?id=100053927520168">Ashfaq Ahmed</a></strong></h1>
            </div>
        </>
    );
}
