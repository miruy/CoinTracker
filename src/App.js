import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [select, setSelect] = useState("");
  const [price, setPrice] = useState(0);
  const [click, setClick] = useState("");
  

  const onSelect = (event) => setSelect(event.target.value);
  const onChange = (event) => {
    setPrice(event.target.value);
  }

  const onClick = () => {
    setClick(current => price);
  }
  
  /* 
    - coin api 가져오기(=fecth, 설치, 적용)
    - 가져온 api의 응답내용을 json형식으로 추출
    - 추출한 json을 내 배열(coins)에 저장
    - 저장한 후 로딩 상태를 false로 변경 -> coins 배열에 데이터가 있으니 화면에 loading글씨가 빠르게 사라짐
  */
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json())
    .then(json => {
      setCoins(json); 
      setLoading(false); 
    });
  }, []);

  

  /*
    - `(${coins.length})` : ''문자열 아니고 ~~이거
  */ 
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})` }</h1>
      {loading ? "Loading.." : 
        <select onChange={onSelect}>
          <option>Select Coin</option>
          {coins.map((coin, id) => (
            <option key={id} value={coin.symbol}>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD</option>
          ))}
        </select>
      }

      <hr />

      {select === "" ? null :
        <div>
          <input value={price} onChange={onChange} type="number" placeholder="Write Changed USD To KRW"></input>
          <button onClick={onClick}>Change To {select}</button>
          <br />

          {click !== "" ? <input id="selectValue" value={price * 0.000051} disabled></input> : null}
        
        </div>
      }
     
      
    </div>
  );
}

export default App;
