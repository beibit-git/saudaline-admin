export interface GroupOfEducationProgramDtoResponse {
  id: number;
  titleEn: string;
  titleRu: string;
  titleKz: string;
  code: string;
  // Если parent null, то это область образования
  // Если parent равняется выбранной области образования, то это направление подготовки
  // Группа образовательных программ - Выводим те, у которых parent равняется айди направления подготовки
  parent: number; 
}