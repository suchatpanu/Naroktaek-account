insert into payment_methods (code, name)
values
  ('cash', 'เงินสด'),
  ('bank_transfer', 'เงินโอน'),
  ('ocha', 'Ocha'),
  ('delivery', 'Delivery'),
  ('other', 'อื่น ๆ')
on conflict (code) do nothing;

insert into expense_categories (code, name, type)
values
  ('raw_pork', 'ค่าหมู', 'RAW_MATERIAL'),
  ('raw_beef', 'ค่าเนื้อ', 'RAW_MATERIAL'),
  ('vegetables', 'ร้านผัก', 'RAW_MATERIAL'),
  ('noodles', 'ร้านเส้น', 'RAW_MATERIAL'),
  ('meatballs', 'ค่าลูกชิ้น', 'RAW_MATERIAL'),
  ('coconut_milk', 'ร้านกะทิ', 'RAW_MATERIAL'),
  ('sauces', 'ค่าซอส', 'RAW_MATERIAL'),
  ('gas', 'ค่าแก๊ส', 'UTILITY'),
  ('ice', 'ค่าน้ำแข็ง', 'UTILITY'),
  ('transport', 'ค่ารถ', 'OTHER'),
  ('dessert', 'ค่าขนมถ้วย', 'OTHER'),
  ('soft_drink', 'ค่าน้ำอัดลม', 'OTHER'),
  ('ocha_fee', 'ค่า Ocha', 'OTHER'),
  ('labor_daily', 'ค่าแรงรายวัน', 'LABOR'),
  ('salary', 'เงินเดือน', 'FIXED_COST'),
  ('rent', 'ค่าเช่าร้าน', 'FIXED_COST'),
  ('water', 'ค่าน้ำ', 'UTILITY'),
  ('electricity', 'ค่าไฟ', 'UTILITY'),
  ('other', 'อื่น ๆ', 'OTHER')
on conflict (code) do nothing;
