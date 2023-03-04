//音乐播放信息
export class songInfo {
  constructor(index=0, song, url = '', id) {
    this.index = index;
    this.name = song.name;
    this.artist = song.artist;
    this.src = url;
    this.pic = song.pic;
    this.id = id;
  }
}
