# OPTIMAQ Dataset Import Guide

## Overview
OPTIMAQ now supports flexible data import to work with any resource management dataset. The system can normalize different data formats and field names to create consistent resource allocations.

## Supported Data Formats

### JSON Format
```json
[
  {
    "id": "Resource_Name",
    "capacity": 100,
    "load": 75,
    "tasks": ["Task1", "Task2"]
  }
]
```

### CSV Format
```csv
id,capacity,load,tasks
ICU_Ward,20,18,"Patient_Care,Monitoring"
ER_Ward,15,12,"Emergency_Response"
```

## Field Name Mappings

The system automatically recognizes these field names:

| Field Type | Recognized Names |
|-----------|------------------|
| **Resource ID** | id, name, resourceName, resource_name |
| **Capacity** | capacity, max_capacity, totalBeds, total_capacity, max_load |
| **Current Load** | load, current_load, occupiedBeds, occupied, usage |
| **Tasks/Activities** | tasks, activities, allocations, assignments |

## Use Cases

### 1. Hospital Resource Management
- Ward bed availability
- Equipment allocation
- Staff scheduling
- Operating room utilization

**Example Fields:**
- Hospital Room ID, Total Beds, Occupied Beds, Patient Activities

### 2. Clinic Operations
- Consultation room scheduling
- Lab capacity
- Pharmacy resource allocation
- Reception workload

**Example Fields:**
- Department ID, Available Slots, Scheduled Slots, Services

### 3. Warehouse & Inventory
- Storage area capacity
- Inventory levels
- Packing station efficiency
- Loading dock operations

**Example Fields:**
- Section ID, Storage Capacity, Current Stock, Activities

### 4. Data Center Operations
- Server rack capacity
- CPU/Memory allocation
- Network bandwidth usage
- Storage system utilization

**Example Fields:**
- Server ID, Total Capacity, Current Load, Running Services

## Data Import Process

### Via File Upload
1. Navigate to **Import** page (top navigation)
2. Upload JSON or CSV file
3. System validates and normalizes data
4. Resources appear in Resources page

### Via Sample Datasets
1. Click on sample dataset buttons:
   - 🏥 Hospital Resources
   - 🏨 Clinic Operations
   - 📦 Warehouse Inventory
   - 🖥️ Data Center Servers
2. Data loads automatically

## Data Validation Rules

- Resource ID is required (uses alternatives if not found)
- Capacity must be > 0
- Load cannot exceed capacity
- Utilization auto-calculated as (load/capacity) × 100%
- Tasks optional (can be empty)

## Dataset Requirements

- **Minimum**: Array of objects with id, capacity, and load
- **Recommended**: Include task/activity field for better insights
- **Format**: JSON or CSV
- **Max Size**: Recommended < 10,000 resources per import

## Features After Import

✅ **Dashboard Analytics**
- Real-time utilization tracking
- Efficiency metrics
- Bottleneck identification
- AI-powered recommendations

✅ **Resource Management**
- Individual resource optimization
- Search and filter resources
- Manual adjustments
- Export reports

✅ **Advanced Analytics**
- Utilization trends
- Top performers ranking
- Comparative analysis
- Performance predictions

## Example Hospital Dataset

See `hospital-resources.json` for a complete hospital resource management example with:
- 10 departments/wards
- Realistic capacity and load data
- Staff and equipment details
- Task assignments

## Tips for Best Results

1. **Consistent Naming**: Use standardized resource IDs (e.g., "ICU_Ward" not "icu ward")
2. **Accurate Data**: Ensure capacity and load reflect actual numbers
3. **Regular Updates**: Re-import updated data monthly for trend analysis
4. **Task Tracking**: Include tasks/activities for better resource allocation insights

## Troubleshooting

| Error | Solution |
|-------|----------|
| "Dataset must be a non-empty array" | Check JSON is array format: `[{...}, {...}]` |
| "Unknown file format" | Use .json or .csv only |
| "Missing required fields" | Ensure data has id, capacity, and load fields |
| "Invalid field names" | Check against supported field names list above |

## Export & Sharing

After importing and optimizing:
1. View optimized resources in Resources page
2. Export report from Dashboard Quick Actions
3. Share insights with stakeholders
4. Track improvements over time
