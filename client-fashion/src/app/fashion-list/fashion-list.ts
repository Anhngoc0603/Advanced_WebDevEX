import { Component } from '@angular/core';
import { Fashion } from '../services/fashion';
import { Router } from '@angular/router';

interface GroupedFashions {
  [key: string]: Fashion[];
}

@Component({
  selector: 'app-fashion-list',
  standalone: false,
  templateUrl: './fashion-list.html',
  styleUrl: './fashion-list.css',
})
export class FashionList {
  fashions: Fashion[] = [];
  groupedFashions: GroupedFashions = {};
  styles: string[] = ['Casual', 'Streetwear', 'Formal'];
  selectedStyle: string = '';
  loading = false;
  errorMessage = '';

  constructor(
    private fashionService: Fashion,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAllFashions();
  }

  loadAllFashions(): void {
    this.loading = true;
    this.errorMessage = '';
    this.selectedStyle = '';
    
    this.fashionService.getAllFashions().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.fashions = response.data;
          this.groupFashionsByStyle();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading fashions:', error);
        this.errorMessage = 'Failed to load fashions. Please try again.';
        this.loading = false;
      }
    });
  }

  groupFashionsByStyle(): void {
    this.groupedFashions = {};
    this.fashions.forEach(fashion => {
      if (!this.groupedFashions[fashion.style]) {
        this.groupedFashions[fashion.style] = [];
      }
      this.groupedFashions[fashion.style].push(fashion);
    });
  }

  filterByStyle(style: string): void {
    if (!style || style.trim() === '') {
      this.loadAllFashions();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.selectedStyle = style;
    
    this.fashionService.getFashionsByStyle(style).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.fashions = response.data;
          this.groupFashionsByStyle();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error filtering fashions:', error);
        this.errorMessage = `Failed to load ${style} fashions. Please try again.`;
        this.loading = false;
      }
    });
  }

  viewDetail(id: string): void {
    this.router.navigate(['/fashion', id]);
  }

  getStyleKeys(): string[] {
    return Object.keys(this.groupedFashions);
  }

  getShortPreview(details: string): string {
    // Remove HTML tags and limit to 150 characters
    const text = details.replace(/<[^>]*>/g, '');
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  }

  clearFilter(): void {
    this.loadAllFashions();
  }
}
