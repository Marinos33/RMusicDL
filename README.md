# RMusicDL

[![Download RMusicDL](https://a.fsdn.com/con/app/sf-download-button)](https://sourceforge.net/projects/rmusicdl/files/latest/download)

A desktop application that allows you to save your favorite playlists online and download all the content they contain. You can even choose in which audio format you want your music and where to download it. In addition, the content of the playlists will be updated and existing content will not be re-downloaded.

## How it works

This is the main screen where you can view and manage your saved playlists.
![ALT](doc/images/Tuto/img1.png)

By clicking on the plus icon at the top left, you can add a playlist.
![ALT](doc/images/Tuto/img2.png)

After clicking on the plus icon, a dialog window will open. Here you can copy and paste the URL of the playlist and the software will try to collect the information about it.
![ALT](doc/images/Tuto/img6.png)

Once the playlist information has been obtained, you will see this information and be able to choose where to download the content and in what format. Click submit to confirm and add the playlist to the main screen.
![ALT](doc/images/Tuto/img7.png)

By clicking on a playlist in the grid, you will see a sidebar on the right which allows you to change the configuration of the playlist, i.e. the download path and the content format.
![ALT](doc/images/Tuto/img5.png)

If you check the box on the left of the screen for at least one playlist, then click the trash icon at the top of the screen. You will delete the playlists for which the box has been checked.
![ALT](doc/images/Tuto/img4.png)

Click on the icon to the right of the playlist to start downloading. During the download, the icon will change to indicating the loading, and when the downloading is finish, it will return to its original form.
![ALT](doc/images/Tuto/img3.png)

## Purpose

This app was designed to download playlists from Youtube. Nontheless, it can technically download music from other web site as it uses yt-dlp to download the contents which support a lot of websites (list of all supported websites [here](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)), but I don't know what will be the behavior with those.

## Issues

If you find any bugs or have any request about an enhancement for the software don't hesitate to add in the Issues tab and I will be glad to try to answer your request.

Those are the things that could be improved:

- the first time you launch the app, it may take some minutes (5 - 10), this is because the app has to download FFMPEG and extract it.
- Sometimes, the app has some difficulty to download large playlist. It will works in the end but you may have to retry the download multiple times.

## Contribution

Any help is appreciated.
