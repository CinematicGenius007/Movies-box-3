import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import './App.css';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import ShowSingleQuery from './components/SSQue.js';

const baseUrl = 'https://api.themoviedb.org/3';
const APIKEY = '?api_key=6cab8f1bc6c79b46b07caa568a62bd8d';


const App = () => {
    const [history, setHistory] = useState([])
    const [pages, setPages] = useState(1)
    const [dataList, setDataList] = useState([])
    const [queryObject, setResult] = useState({
        inputVal: '',
        filterVal: 'multi',
    })
    const [open, setOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [showMain, setShowMain] = useState(true)
    const [singleQueryObject, setSQO] = useState({
        _data: null,
        type: null
    })
    const [creditList, setCL] = useState(null)
    const [currentCredit, setCC] = useState({
        credit_info: null,
        person_info: null
    })
    const [itemClips, setClips] = useState(null)
    const [time, setTime] = useState((new Date()).toString().slice(0, 24)) 

    var clock;

    useEffect(() => {
        (async () => {
            clockRuns()
        })()
    }, [])

    const clockRuns = () => {
        clock = setInterval(() => tick(), 1000)
    }

    const tick = () => {
        setTime((new Date()).toString().slice(0, 24))
    }

    const fetchQuery = async (searchVal, filter, page) => {
        setShowMain(true)
        setOpen(true)
        const queryResult = await fetch(
            baseUrl + '/search/' 
            + filter + APIKEY 
            + '&query=' + searchVal 
            + '&page=' + page 
            + '&include_adult=false' // very important
        )
        const data = await queryResult.json()
        console.log(data)
        setPages(data.total_pages)
        setDataList(data.results)

        setTimeout(() => {
            window.scroll({ top: 130, left: 0, behavior: 'smooth' })
        }, 100)
        const status = await queryResult.status
        if ((status) === 200) {
            setTimeout(() => {
                setOpen(false)
            }, 1400)
        }

        history.push({
            searchtype: 'search',
            searchValue: searchVal, 
            filterValue: filter, 
            pageNo: page,
            clock: time,
        })
        
    }


    const fetchSingleQuery = async (id, media) => {
        setOpen(true)
        setShowMain(false)
        console.log(media)
        if (!media)
            media = queryObject.filterVal

        const queryResult = await fetch(
            baseUrl + '/' + media + '/'
            + id + APIKEY
        )
        const data = await queryResult.json()
        console.log(data)
        if (media === 'tv' || media === 'movie') {
            await fetchCredits(id, media)
            await fetchVideos(id, media)
        }
        
        setSQO({ _data: data, type: media })

        const status = await queryResult.status
        if ((status) === 200) {
            const imgs = document.images
            const len = imgs.length
            var counter = 0

            const incrementCounter = () => {
                counter++;
                if ( counter === len ) {
                    console.log( 'All images loaded!' )
                    setTimeout(() => {
                        setOpen(false)
                    }, 700)
                    // setTimeout(() => {
                    //     var qConElmTop = document.querySelector('.p-que-container').offsetTop
                    //     window.scroll({ top: qConElmTop + 20, left: 0, behavior: 'smooth' })
                    // }, 650)
                }
            }

            [].forEach.call( imgs, function( img ) {
                if(img.complete)
                  incrementCounter();
                else
                  img.addEventListener( 'load', incrementCounter, false );
            } );
            
        }

        setTimeout(() => {
            setOpen(false)
        }, 5000)
        setTimeout(() => {
            var qConElmTop = document.querySelector('.p-que-container').offsetTop
            window.scroll({ top: qConElmTop + 20, left: 0, behavior: 'smooth' })
        }, 700)

        history.push({ 
            searchtype: 'queryid',
            Qid: id, 
            name: data.title || data.name,
            mediaType: media,
            clock: time,
        })
    }


    const fetchVideos = async (id, media) => {
        const result = await fetch(
            baseUrl + '/' + media + '/'
            + id + '/videos' + APIKEY
        )

        const videos = await result.json()
        setClips(videos)
        console.log(videos)
    }


    const fetchCredits = async (id, media) => {
        const result = await fetch(
            baseUrl + '/' + media + '/'
            + id + '/credits'
            + APIKEY
        )
        const creditList = await result.json()
        console.log(creditList)
        setCL(creditList)
        if (creditList.cast.length > 0) 
            fetchCreditInfo(creditList.cast[0].credit_id, creditList.cast[0].id)
        
    }


    const fetchCreditInfo = async (c_id, p_id) => {
        const result_c = await fetch(
            baseUrl + '/credit/'
            + c_id + APIKEY
        )

        const creditDeets = await result_c.json()
        console.log(creditDeets)

        const result_p = await fetch(
            baseUrl + '/person/'
            + p_id + APIKEY
        )

        const personDeets = await result_p.json()
        console.log(personDeets)
        setCC({ credit_info: creditDeets, person_info: personDeets })
        

        // return 'done'
    }


    const onFormSubmission = (searchVal, filter) => {
        fetchQuery(searchVal, filter, 1)
        setResult({ inputVal: searchVal, filterVal: filter })
    }

    const fetchMoreQueries = (pageNo) => {
        fetchQuery(queryObject.inputVal, queryObject.filterVal, pageNo)
    }

    const goBackToMain = () => {
        setShowMain(true)
        setSQO({ _data: null, type: null })
        setCL(null)
        setCC({ credit_info: null, person_info: null })
        setClips(null)
        setTimeout(() => {
            window.scroll({ top: 130, left: 0, behavior: 'smooth' })
        }, 100)
    }

    const handleMenuClick = () => {
        console.log('menu called')
        
        // var body = document.querySelector('body')
        // var root = document.querySelector('#root-container')
        var head = document.querySelector('#header')
        var main = document.querySelector('#main')
        if (!menuOpen) {
            // body.style.backgroundColor = root.style.backgroundColor = '#000000'
            if (head) {
                head.style.opacity = '0.6'
                head.style.pointerEvents = 'none'
            }
            if (main) {
                main.style.opacity = '0.6'
                main.style.pointerEvents = 'none'
            }
        } else if (menuOpen) {
            // body.style.backgroundColor = root.style.backgroundColor = '#0a0c18'
            if (head) {
                head.style.opacity = '1'
                head.style.pointerEvents = 'auto'
            }
            if (main) {
                main.style.opacity = '1'
                main.style.pointerEvents = 'auto'
            }
                
        }
        setMenuOpen(!menuOpen)
    }

    // const appendToHistory = (id, type) => {
    //     history.push({ 
    //         searchtype: 'queryid',
    //         Qid: id,
    //         mediaType: type,
    //     })
    // }



    return (
        <div id="root-container">
            <Menu history={history}
                show={menuOpen}
                onClose={handleMenuClick} />
            <Header 
                onSubmit={onFormSubmission} 
                onMenuClick={handleMenuClick}/>
            {showMain && <Main 
                dataList={dataList} 
                pageT={pages} 
                onChange={fetchMoreQueries} 
                onCardClick={fetchSingleQuery} 
            />}
            {!showMain && <ShowSingleQuery 
                details={singleQueryObject._data} 
                subDeets={creditList}
                creditInfo={currentCredit}
                videos={itemClips}
                onCreditClick={fetchCreditInfo}
                onBtnClick={goBackToMain} 
                mediaType={singleQueryObject.type}
                />}
            {/*<div style={{ margin: '40px' }}>
                {time}
            </div>*/}
            <Footer time={time} />
            <GetBackDrop openBackdrop={open} />
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

/* eslint-disable */
const GetBackDrop = ({ openBackdrop }) => {
    const classes = useStyles()
    

    return (
        <Backdrop 
            className={classes.backdrop} 
            open={openBackdrop}
            // ref={refrense}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
    )   
}


export default App;


// var imgs = document.images,
//     len = imgs.length,
//     counter = 0;

// [].forEach.call( imgs, function( img ) {
//     if(img.complete)
//       incrementCounter();
//     else
//       img.addEventListener( 'load', incrementCounter, false );
// } );

// function incrementCounter() {
//     counter++;
//     if ( counter === len ) {
//         console.log( 'All images loaded!' );
//     }
// }
