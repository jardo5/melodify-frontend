import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import {DecimalPipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {Song} from "../../../models/music/song.model";

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe,
    DecimalPipe,
    NgForOf
  ],
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit{
  @Input() song?: Song;
  @Output() close = new EventEmitter<void>();

  // TODO: Add these back after styling
  // isLoading = false;
  // errorMessage: string | null = null;
  // constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  closeDetails() {
    this.close.emit();
  }

  getProviderIcon(provider: string): string {
    const providerIcons: { [key: string]: string } = {
      'Apple Music': 'applemusic.svg',
      'spotify': 'spotify.svg',
      'soundcloud': 'soundcloud.svg',
      'youtube': 'youtube.svg'
    };

    return `assets/providers/${providerIcons[provider] || 'default-icon.svg'}`;
  }

  //TODO: Remove this after styling
  ngOnInit(): void {
    this.song = new Song({
      "id": "3035222",
      "artist": "Kendrick Lamar",
      "title": "DNA.",
      "fullTitle": "DNA. by Kendrick Lamar",
      "imageUrl": "https://images.genius.com/f3f77222e1b615e0a10354ea6282ff22.1000x1000x1.png",
      "appleMusicId": "1223592492",
      "description": "On “DNA.,” Kendrick Lamar adopts multiple viewpoints; celebrating, critiquing, and exploring his black heritage and culture. In the music video, Kendrick and actor Don Cheadle appear to trade bars, engaging in an argument using the song’s lyrics during an interrogation scene. We also learn that “DNA” stands for “Dead Nigger Association.”Lamar is wearing a traditional Kung Fu uniform throughout the piece. In an interview with Pitchfork, Don Cheadle confirmed that he inadvertently inspired the ‘Kung Fu Kenny’ persona. Cheadle portrayed a Chinese-speaking martial artist named Kenny in the 2001 action-comedy sequel Rush Hour 2.At the beginning of the video, the song “YAH.” can be heard echoing above—almost as if it is playing in Kendrick’s head as the camera pans down. “YAH.” comes directly after “DNA.” on DAMN.’s tracklist.Following his initial encounter with Cheadle, who seems to be portraying a law enforcement figure, the ending of “BLOOD.” suddenly begins playing; when Cheadle turns on the lie-detector device, he begins convulsing, almost as if in a trance. This snippet comes from the video of Geraldo Rivera criticizing Kendrick’s lyrics on “Alright,” one of his most successful singles. The music video also contains snippets from “Hood Politics,” another song from Lamar’s March 2015 award-winning album, To Pimp A Butterfly.Lastly, the song’s second verse samples a different segment of the same Fox News clip from “BLOOD.” and it’s worth noting that “BLOOD.” precedes “DNA.” on the album.",
      "releaseDate": "Apr. 14, 2017",
      "pageViews": 6352303,
      "geniusUrl": "https://genius.com/Kendrick-lamar-dna-lyrics",
      "externalLinks": [
        {
          "provider": "spotify",
          "url": "https://open.spotify.com/track/6HZILIRieu8S0iqY8kIKhj"
        },
        {
          "provider": "soundcloud",
          "url": "https://soundcloud.com/kendrick-lamar-music/dna"
        },
        {
          "provider": "youtube",
          "url": "http://www.youtube.com/watch?v=NLZRYQMLDW4"
        }
      ],
      "album": {
        "id": "337082",
        "fullTitle": "DAMN. by Kendrick Lamar",
        "coverUrl": "https://images.genius.com/f3f77222e1b615e0a10354ea6282ff22.1000x1000x1.png",
        "releaseDate": ""
      },
      "primaryArtist": {
        "id": "1421",
        "name": "Kendrick Lamar",
        "imageUrl": "https://images.genius.com/577393843e2fe24d9bcb1b6917b81772.1000x1000x1.png"
      },
      "lyrics": "I got, I got, I got, I got\nLoyalty, got royalty inside my DNA\nCocaine quarter piece, got war and peace inside my DNA\nI got power, poison, pain and joy inside my DNA\nI got hustle though, ambition, flow, inside my DNA\nI was born like this, since one like this\nImmaculate conception\nI transform like this, perform like this\nWas Yeshua's new weapon\nI don’t contemplate, I meditate, then off your fucking head\nThis that put-the-kids-to-bed\nThis that I got, I got, I got, I got\nRealness, I just kill shit 'cause it's in my DNA\n\nI got millions, I got riches buildin’ in my DNA\nI got dark, I got evil, that rot inside my DNA\nI got off, I got troublesome, heart inside my DNA\nI just win again, then win again like Wimbledon, I serve\nYeah that's him again, the sound that engine in is like a bird\nYou see fireworks and Corvette tire skrrt the boulevard\nI know how you work, I know just who you are\nSee you's a, you's a, you's a—\nBitch, your hormones prolly switch inside your DNA\nProblem is, all that sucker shit inside your DNA\nDaddy prolly snitched, heritage inside your DNA\nBackbone don't exist, born outside a jellyfish, I gauge\nSee my pedigree most definitely don't tolerate the front\n\nShit I've been through prolly offend you\nThis is Paula’s oldest son\nI know murder, conviction, burners\nBoosters, burglars, ballers, dead, redemption\nScholars, fathers dead with kids\nAnd I wish I was fed forgiveness\nYeah, yeah, yeah, yeah, soldier’s DNA\nBorn inside the beast\nMy expertise checked out in second grade\nWhen I was 9, on cell, motel, we didn't have nowhere to stay\nAt 29, I’ve done so well, hit cartwheel in my estate\nAnd I'm gon' shine like I'm supposed to\nAntisocial, extrovert\nAnd excellent mean the extra work\nAnd absentness what the fuck you heard\nAnd pessimists never struck my nerve\n\nAnd that’s a riff, gonna plead this case\nThe reason my power's here on earth\nSalute the truth, when the prophet say\n\nI got loyalty, got royalty inside my DNA\nThis is why I say that hip hop has done more damage to young African Americans than racism in recent years\nI got loyalty, got royalty inside my DNA\nI live a better life, I'm rollin' several dice, fuck your life\nI got loyalty, got royalty inside my DNA\nI live a better, fuck your life\n5, 4, 3, 2, 1\nThis is my heritage, all I'm inheritin'\nMoney and power, the makin' of marriages\n\nTell me somethin'\n\nYou mothafuckas can't tell me nothin'\nI'd rather die than to listen to you\nMy DNA not for imitation\nYour DNA an abomination\nThis how it is when you're in the Matrix\nDodgin' bullets, reapin' what you sow\nAnd stackin' up the footage, livin' on the go\nAnd sleepin' in a villa\nSippin' from a Grammy and walkin' in the buildin'\nDiamond in the ceilin', marble on the floors\nBeach inside the window, peekin' out the window\nBaby in the pool, godfather goals\nOnly Lord knows, I've been goin' hammer\nDodgin' paparazzi, freakin' through the cameras\nEat at Four Daughters, Brock wearin' sandals\nYoga on a Monday, stretchin' to Nirvana\nWatchin' all the snakes, curvin' all the fakes\nPhone never on, I don't conversate\n\nI don't compromise, I just penetrate\nSex, money, murder, these are the breaks\nThese are the times, level number 9\nLook up in the sky, 10 is on the way\nSentence on the way, killings on the way\nMotherfucker, I got winners on the way\nYou ain't shit without a body on your belt\nYou ain't shit without a ticket on your plate\nYou ain't sick enough to pull it on yourself\nYou ain't rich enough to hit the lot and skate\nTell me when destruction gonna be my fate\nGonna be your fate, gonna be our fate\nPeace to the world, let it rotate\nSex, money, murder, our DNA",
      "sentiment": "{\"sentiment_analysis\":{\"moods\":[\"Powerful\",\"Defiant\",\"Reflective\",\"Confident\"],\"overall_mood\":\"Intense\",\"analysis\":{\"tone\":\"Assertive and unapologetic\",\"narrative\":\"The lyrics depict a complex journey of self-discovery and empowerment, challenging societal norms and embracing individuality.\",\"theme\":\"Exploration of personal identity and resilience in the face of adversity\"}}}"
    });
  }
}
