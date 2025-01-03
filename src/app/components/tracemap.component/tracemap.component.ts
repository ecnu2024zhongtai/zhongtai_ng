import { Component, OnInit, AfterViewInit} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tracemap',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: 'tracemap.component.html',
  styleUrls: ['tracemap.component.css']
})
export class TracemapComponent implements OnInit, AfterViewInit {
    baseurl = "http://law.conetop.cn:8004"
    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit");
        this.httpClient.get(`${this.baseurl}/api/v1/tracemap`, { responseType: 'text' }).subscribe(htmldata => {
            this.updateIframeContent(htmldata);
        });
    }

    updateIframeContent(content: string) {
        const iframe = document.getElementById('tracemapIframe') as HTMLIFrameElement;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
            doc.open();
            doc.write(content);
            doc.close();
        }
        this.hideTips();
    }
    hideTips() {
        const tips = document.getElementById('tips');
        if (tips) {
            tips.style.display = 'none';
        }
    }
}