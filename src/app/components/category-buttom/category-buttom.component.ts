import { Component } from '@angular/core';

@Component({
  selector: 'app-category-buttom',
  templateUrl: './category-buttom.component.html',
  styleUrls: ['./category-buttom.component.css']
})
export class CategoryButtomComponent {
  recyclingTips = [
    {
      title: 'فصل المخلفات',
      description: 'افصل المخلفات إلى أوراق، بلاستيك، زجاج، ومعادن للحصول على إعادة تدوير أفضل.',
      icon: 'assets/images/recycle-bin.png'
    },
    {
      title: 'تحويل النفايات العضوية',
      description: 'استخدم النفايات العضوية مثل بقايا الطعام لتحضير السماد الطبيعي.',
      icon: 'assets/images/compost.png'
    },
    {
      title: 'تقليل الاستهلاك',
      description: 'حاول شراء المنتجات القابلة لإعادة الاستخدام لتقليل كمية المخلفات.',
      icon: 'assets/images/reduce-waste.png'
    }
  ];
}
