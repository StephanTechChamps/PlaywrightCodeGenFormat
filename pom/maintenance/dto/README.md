# Lombok-achtige Features in TypeScript DTO

## Overzicht

De `MaintenanceEventDTO` is uitgebreid met TypeScript features die vergelijkbaar zijn met Lombok annotations in Java.

## Lombok vs TypeScript Vergelijking

| Lombok Annotation | TypeScript Equivalent | Implementatie |
|-------------------|----------------------|---------------|
| `@Value` | `readonly` properties | ✅ Geïmplementeerd |
| `@Builder` | Static `builder()` method + Builder class | ✅ Geïmplementeerd |
| `@ToString` | `toString()` method | ✅ Geïmplementeerd |
| `@EqualsAndHashCode` | `equals()` method | ✅ Geïmplementeerd |
| `@With` | `withX()` methods | ✅ Geïmplementeerd |
| `@AllArgsConstructor` | Constructor | ✅ Geïmplementeerd |

---

## Features

### 1. Readonly Properties (zoals `@Value`)

```typescript
export class MaintenanceEventDTO {
    readonly vehicleCode: vehicleCode;
    readonly startDate: string;
    readonly endDate: string;
}
```

Properties kunnen niet worden gewijzigd na constructie, wat immutability garandeert.

---

### 2. Builder Pattern (zoals `@Builder`)

```typescript
// Gebruik de static builder method
const event = MaintenanceEventDTO.builder()
    .withVehicleCode(vehicleCode.QC8)
    .withStartDate('Nov 20, 2025 (15:20)')
    .withEndDate('Nov 20, 2026 (20:00)')
    .build();
```

---

### 3. ToString Method (zoals `@ToString`)

```typescript
const event = new MaintenanceEventDTO(vehicleCode.QC8, 'Nov 20, 2025', 'Nov 20, 2026');
console.log(event.toString());
// Output: MaintenanceEventDTO(vehicleCode=QC08, startDate=Nov 20, 2025, endDate=Nov 20, 2026)
```

---

### 4. Equals Method (zoals `@EqualsAndHashCode`)

```typescript
const event1 = new MaintenanceEventDTO(vehicleCode.QC8, 'Nov 20, 2025', 'Nov 20, 2026');
const event2 = new MaintenanceEventDTO(vehicleCode.QC8, 'Nov 20, 2025', 'Nov 20, 2026');

console.log(event1.equals(event2)); // true
```

---

### 5. With Methods (zoals `@With`)

```typescript
const original = new MaintenanceEventDTO(vehicleCode.QC8, 'Nov 20, 2025', 'Nov 20, 2026');

// Maak een nieuwe instantie met gewijzigde startDate
const modified = original.withStartDate('Nov 21, 2025');

console.log(original.startDate);  // 'Nov 20, 2025' (ongewijzigd)
console.log(modified.startDate);  // 'Nov 21, 2025' (nieuwe instantie)
```

---

## Gebruik in Tests

### Optie 1: Direct constructor gebruiken
```typescript
const event = new MaintenanceEventDTO(
    vehicleCode.QC8,
    'Nov 20, 2025 (15:20)',
    'Nov 20, 2026 (20:00)'
);

await addMaintenance.createMaintenanceEvent()
    .withDTO(event)
    .submit();
```

### Optie 2: DTO Builder gebruiken
```typescript
const event = MaintenanceEventDTO.builder()
    .withVehicleCode(vehicleCode.QC8)
    .withStartDate('Nov 20, 2025 (15:20)')
    .withEndDate('Nov 20, 2026 (20:00)')
    .build();

await addMaintenance.createMaintenanceEvent()
    .withDTO(event)
    .submit();
```

### Optie 3: Direct fluent API (huidige aanpak)
```typescript
await addMaintenance.createMaintenanceEvent()
    .withVehicle(vehicleCode.QC8)
    .withStartDate('Nov 20, 2025 (15:20)')
    .withEndDate('Nov 20, 2026 (20:00)')
    .submit();
```

---

## Voordelen

✅ **Immutability**: Readonly properties voorkomen onbedoelde wijzigingen  
✅ **Type Safety**: TypeScript compiler controleert alle types  
✅ **Flexibiliteit**: Meerdere manieren om objecten te maken  
✅ **Testbaarheid**: Makkelijk om test data te maken en te vergelijken  
✅ **Leesbaarheid**: Duidelijke, self-documenting code
