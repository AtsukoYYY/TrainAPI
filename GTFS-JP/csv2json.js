// 必要なモジュールの読み込み
const fs = require('fs');
const csv = require('csv');
const stripBom = require('strip-bom');

// 変換するファイルリストの作成
var filenames = [];
filenames.push('trips');
filenames.push('calendar');
filenames.push('calendar_dates');
filenames.push('stop_times');
filenames.push('stops');
filenames.push('trips');

for(let i = 0;i<filenames.length;i++){
    // ファイル読み込み処理
    const text = fs.readFileSync(__dirname + '/GTFS-JP/' + filenames[i] + '.txt', 'utf-8',function(err, result) {
      if(err) console.log('error', err);
    });
    // BOMの削除
    const stripped = stripBom(text);
  
    // テキストファイルの書き出し
    fs.writeFileSync(__dirname + '/GTFS-JP/' + filenames[i] + '.txt', stripped,function(err, result) {
      if(err) console.log('error', err);
    });

    fs.createReadStream(__dirname + '/GTFS-JP/' + filenames[i] + '.txt')
    .pipe(csv.parse({columns: true},function(err, data) { 

        var jsonstring = JSON.stringify(data);
        fs.writeFile(filenames[i] + '.json', jsonstring,function(err, result) {
          if(err) console.log('error', err);
        });

  }));

  }