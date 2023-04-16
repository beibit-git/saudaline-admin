import { AbiturCatalogDtoResponse } from "./AbiturCatalogDtoResponse";
import { CenterKatoDtoResponse } from "./CenterKatoDtoResponse";
import { CenterKatoRegionDtoResponse } from "./CenterKatoRegionDtoResponse";
import { DistinctionMarkTypeDtoResponse } from "./DistinctionMarkTypeDtoResponse";
import { SchoolsDtoResponse } from "./SchoolsDtoResponse";

export interface StudentEducationalInfoDtoResponse {
    id: number;

    country: AbiturCatalogDtoResponse;

    educationalInstitution: string;

    distinctionMarkType: DistinctionMarkTypeDtoResponse;

    school: SchoolsDtoResponse;

    schoolRegionId: CenterKatoRegionDtoResponse;

    schoolAddressId: CenterKatoDtoResponse;

    kzGraduationCertificateSeries: string;

    kzGraduationCertificateNumber: string;

    kzGraduationCertificateAveragePoint: string;

    graduationCertificateIssueDate: Date;

    graduationCertificateName: string;

    nostrificationCertificateNumber: string;

    nostrificationCertificateDate: Date;

    specialityName: string;

    educationInstitutionType: AbiturCatalogDtoResponse;
}