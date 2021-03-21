// 必要なモジュールの読み取り
var fs = require( 'fs' );
var unzip = require( 'unzipper' );

// ファイルの解凍
fs.createReadStream( './GTFS-JP.zip' )
.pipe( unzip.Extract( { path: './GTFS-JP' } ) );