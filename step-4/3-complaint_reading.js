// Step 3: image-to-text — describe a local image using the vision utility.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeImage } from "../ai/3-vision.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const imagePath = join(scriptDir, "2-sample.png");

const userPrompt = `read the image and fill up this json. Give JSON output. Fill in english.

    {
        "complainant_details": {
            "full_name": "",
            "father_or_husband_name": "",
            "current_address": "",
            "permanent_address": "",
            "mobile_number": "",
            "email_address": "",
            "aadhaar_number_optional": ""
        },
        "incident_details": {
            "date_of_incident": "",
            "time_of_incident": "",
            "place_of_occurrence": "",
            "police_station_jurisdiction": "",
            "district": "",
            "delay_in_reporting_reason": ""
        },
        "accused_details": {
            "is_known_or_unknown": "",
            "accused_name_if_known": "",
            "accused_address_if_known": "",
            "physical_description_or_features": ""
        },
        "offence_details": {
            "nature_of_crime": "",
            "detailed_description_of_incident": "",
            "motive_of_crime": "",
            "stolen_property_or_vehicles_details": "",
            "injury_details_if_any": ""
        },
        "witness_details": [
            {
            "witness_name": "",
            "witness_address": "",
            "witness_contact_number": ""
            }
        ]
    }

`;

const description = await analyzeImage(imagePath, userPrompt);
console.log(description);
