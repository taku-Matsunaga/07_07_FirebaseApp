// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "",
  authDomain: "fir-app-56c90.firebaseapp.com",
  databaseURL: "https://fir-app-56c90.firebaseio.com",
  projectId: "fir-app-56c90",
  storageBucket: "fir-app-56c90.appspot.com",
  messagingSenderId: "1017487119677",
  appId: "1:1017487119677:web:45fec00cd58256878a2154"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);


// 日時をいい感じの形式にする関数
function convertFromFirestoreTimestampToDatetime(timestamp) {
  const _d = timestamp ? new Date(timestamp * 1000) : new Date();
  const Y = _d.getFullYear();
  const m = (_d.getMonth() + 1).toString().padStart(2, '0');
  const d = _d.getDate().toString().padStart(2, '0');
  const H = _d.getHours().toString().padStart(2, '0');
  const i = _d.getMinutes().toString().padStart(2, '0');
  const s = _d.getSeconds().toString().padStart(2, '0');
  return `${Y}/${m}/${d} ${H}:${i}:${s}`;
}


// データベースの設定を記述
// const db = firebase.firestore().collection('textData');
// const db2 = firebase.firestore().collection('imgData');


// 送信ボタンクリック時にデータを送信する処理
$('#girls').on('click', function () {
  const data = {
    text: $('#girls').val(),
    time: firebase.firestore.FieldValue.serverTimestamp(),
  };
  dbText.add(data);
  insertImg();
});
$('#cute').on('click', function () {
  const data = {
    text: $('#cute').val(),
    time: firebase.firestore.FieldValue.serverTimestamp(),
  };
  dbText.add(data);
  insertImgAnimal();
});
$('#funny').on('click', function () {
  const data = {
    text: $('#funny').val(),
    time: firebase.firestore.FieldValue.serverTimestamp(),
  };
  dbText.add(data);
  insertImgFunny();
});

if (firebase.apps.length === 0) {
  var testapp = firebase.initializeApp(firebaseConfig);
}

var dbText;
// var testapp = firebase.initializeApp(firebaseConfig);
dbText = firebase.firestore(testapp).collection('textData');

dbText.orderBy('time', 'desc').get().then(querySnapshot => {
  // querySnapshot.forEach(docs => {
    //それぞれのレコードに対する処理
    console.log(querySnapshot.docs);
    const dataArray = [];
    querySnapshot.docs.forEach(function (doc) {
      console.log(doc.id);
      console.log(doc.data());
      const data = {
        id: doc.id,
        data: doc.data(),
      }
      dataArray.push(data);
      // console.log(`ここはデータ${JSON.stringify(dataArray)}`);
    });

    const tagArray = [];

    dataArray.forEach(function (data) {
      tagArray.push(`
        <li class = "chatBox" id = ${data.id}>
            <p class = "chatText">${data.data.text}</p>
            <p class = "chatTime">${convertFromFirestoreTimestampToDatetime(data.data.time.seconds)}</p>
          </li>
        `);
      $('#output').html(tagArray);
    });
    // });


});


// クリックでドキュメント一括Delete
$('#deleteDocument').on('click', function () {
  dbText.orderBy('time', 'desc').get().then(querySnapshot => {
    querySnapshot.forEach(docs => {
      //それぞれのレコードに対する処理
      console.log(querySnapshot.docs);
      const dataArrayDelete = [];
      querySnapshot.docs.forEach(function (doc) {
        console.log(doc.id);
        console.log(doc.data());
        const dataDelete = {
          id: doc.id,
        }
        dataArrayDelete.push(dataDelete);
      });

      console.log(`データ削除IDです${JSON.stringify(dataArrayDelete)}`);

      for (let i = 0; i < dataArrayDelete.length; i++) {
        firebase.firestore(testapp).collection('textData').doc(dataArrayDelete[i].id).delete();
        console.log('削除しました')
      }

    });


  })
})


// girls画像のインサート
function insertImg() {

  var dbImg;
  // var testapp = firebase.initializeApp(firebaseConfig);
  dbImg = firebase.firestore(testapp).collection('imgData');

  dbImg.get().then(querySnapshot => {
    //それぞれのレコードに対する処理
    const dataArray2 = [];
    querySnapshot.forEach(function (doc) {
      const data = {
        id: doc.id,
        data: doc.data(),
      }
      dataArray2.push(data);
    });

    console.log(dataArray2);

    const random = Math.floor(Math.random() * dataArray2.length);

    const insertGirlImg = dataArray2[random];

    console.log(insertGirlImg);

    const insertImgOutput = `
            <li class = "imgList" id = ${insertGirlImg.id}>
                <img class = "imgItem" src="${insertGirlImg.data.img}">
              </li>
      `;

    console.log(`ここはアウトプットイメージ${insertImgOutput}`)

    $('#output').prepend(insertImgOutput);

  });
}


// Animal画像のインサート
function insertImgAnimal() {

  var dbImg;
  // var testapp = firebase.initializeApp(firebaseConfig);
  dbImg = firebase.firestore(testapp).collection('imgDataAnimal');

  dbImg.get().then(querySnapshot => {
    //それぞれのレコードに対する処理
    const dataArray3 = [];
    querySnapshot.forEach(function (doc) {
      const data = {
        id: doc.id,
        data: doc.data(),
      }
      dataArray3.push(data);
    });

    console.log(dataArray3);

    const random = Math.floor(Math.random() * dataArray3.length);

    const insertAnimalImg = dataArray3[random];

    console.log(insertAnimalImg);

    const insertAnimalImgOutput = `
            <li class = "imgList" id = ${insertAnimalImg.id}>
                <img class = "imgItem" src="${insertAnimalImg.data.img}">
              </li>
      `;

    console.log(`ここはアウトプットイメージ${insertAnimalImgOutput}`);

    $('#output').prepend(insertAnimalImgOutput);

  });
}


// Funny画像のインサート
function insertImgFunny() {

  var dbImg;
  // var testapp = firebase.initializeApp(firebaseConfig);
  dbImg = firebase.firestore(testapp).collection('imgDataFunny');

  dbImg.get().then(querySnapshot => {
    //それぞれのレコードに対する処理
    const dataArray4 = [];
    querySnapshot.forEach(function (doc) {
      const data = {
        id: doc.id,
        data: doc.data(),
      }
      dataArray4.push(data);
    });

    console.log(dataArray4);

    const random = Math.floor(Math.random() * dataArray4.length);

    const insertFunnyImg = dataArray4[random];

    console.log(insertFunnyImg);

    const insertFunnyImgOutput = `
            <li class = "imgList" id = ${insertFunnyImg.id}>
                <img class = "imgItem" src="${insertFunnyImg.data.img}">
              </li>
      `;

    console.log(`ここはアウトプットイメージ${insertFunnyImgOutput}`);

    $('#output').prepend(insertFunnyImgOutput);

  });
}

// 画面リロード
document.getElementById('reload').onclick = function () {
  location.reload();
}
