import React , {useEffect , useState} from 'react'
import axios from 'axios'
import './MainPageContent.style.css'
import {useSelector , useDispatch} from 'react-redux'
// import data slice actions 
import {dataSliceActions} from '../redux-setup/store/fetchDataSlice'
// import single repo component 
import SingleRepo from '../components/SingleRepo'
// import infinity scroll tool 
import InfiniteScroll from 'react-infinite-scroll-component';
const MainPageContent = () => {

 const dispatch = useDispatch()
// get params and data from redux
 const page = useSelector((state)=>state.page)
 const sort = useSelector((state)=>state.sort)
 const per_page = useSelector((state)=>state.per_page)
 const order = useSelector((state)=>state.order)
 const IsHaseMore = useSelector((state)=>state.haseMore)
 const reposData = useSelector((state)=>state.repos)

//  check if need to scroll to top 
 const [isVisible, setIsVisible] = useState(false);

//  fetch data with axios 
const fetchData = async ()=>{
  await axios({
   method:'GET',
   url:'https://api.github.com/search/repositories?q=created:%3E2020-10-22',
   params:{page:page , sort:sort, order:order , per_page:per_page},
   
  }).then(res=>{
    // dispatch data to redux 
   dispatch(dataSliceActions.fetchData({data:res.data.items}))
  //  check if there is more data 
   if(res.data.items.length < per_page){
      dispatch(dataSliceActions.haseMore())
   }
  }).catch(err=>{
      console.log(err)
      // alert the error 
      alert(`Error ${err}`)
  })
}

// fetch data at page start 
 useEffect(()=>{
 fetchData()
 },[page])

//  check for scroll to top 
 useEffect(() => {
    // Button is displayed after scrolling for 300 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // scroll to top function 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

//  handle page numper for infinity scroll 
const handlePages = ()=>{
  dispatch(dataSliceActions.pageNumber())
}

 return (
  <main className='main_content_container'>
    {/* hide or show scroll to top button  */}
    {isVisible && (
        <div className="scroll_to_top" onClick={scrollToTop}>
          <p>Up</p>
        </div>
      )}
    <header>
      <div className="header_content">
        <h1>trending github repos</h1>
      </div>
    </header>
    {/* infinity scrool */}
<InfiniteScroll
  dataLength={reposData.length}
  next={handlePages}
  hasMore={IsHaseMore}
  loader={<h4 className='infinity_loading'>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
>
  {/* display repos data  */}
  {
    reposData.map((repo)=> {
      return <SingleRepo key={repo.id} {...repo}/>
     })
   }
</InfiniteScroll>
  </main>
 )
}

export default MainPageContent
