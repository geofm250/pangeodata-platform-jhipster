package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A LicenseCheckReport.
 */
@Document(collection = "license_check_report")
public class LicenseCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("license_verified")
    private String licenseVerified;

    @Field("lic_registration_number")
    private String licRegistrationNumber;

    @Field("license_status")
    private String licenseStatus;

    @Field("lic_verified_by")
    private String licVerifiedBy;

    @Field("lic_verified_date")
    private String licVerifiedDate;

    @Field("lic_remarks")
    private String licRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLicenseVerified() {
        return licenseVerified;
    }

    public LicenseCheckReport licenseVerified(String licenseVerified) {
        this.licenseVerified = licenseVerified;
        return this;
    }

    public void setLicenseVerified(String licenseVerified) {
        this.licenseVerified = licenseVerified;
    }

    public String getLicRegistrationNumber() {
        return licRegistrationNumber;
    }

    public LicenseCheckReport licRegistrationNumber(String licRegistrationNumber) {
        this.licRegistrationNumber = licRegistrationNumber;
        return this;
    }

    public void setLicRegistrationNumber(String licRegistrationNumber) {
        this.licRegistrationNumber = licRegistrationNumber;
    }

    public String getLicenseStatus() {
        return licenseStatus;
    }

    public LicenseCheckReport licenseStatus(String licenseStatus) {
        this.licenseStatus = licenseStatus;
        return this;
    }

    public void setLicenseStatus(String licenseStatus) {
        this.licenseStatus = licenseStatus;
    }

    public String getLicVerifiedBy() {
        return licVerifiedBy;
    }

    public LicenseCheckReport licVerifiedBy(String licVerifiedBy) {
        this.licVerifiedBy = licVerifiedBy;
        return this;
    }

    public void setLicVerifiedBy(String licVerifiedBy) {
        this.licVerifiedBy = licVerifiedBy;
    }

    public String getLicVerifiedDate() {
        return licVerifiedDate;
    }

    public LicenseCheckReport licVerifiedDate(String licVerifiedDate) {
        this.licVerifiedDate = licVerifiedDate;
        return this;
    }

    public void setLicVerifiedDate(String licVerifiedDate) {
        this.licVerifiedDate = licVerifiedDate;
    }

    public String getLicRemarks() {
        return licRemarks;
    }

    public LicenseCheckReport licRemarks(String licRemarks) {
        this.licRemarks = licRemarks;
        return this;
    }

    public void setLicRemarks(String licRemarks) {
        this.licRemarks = licRemarks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LicenseCheckReport licenseCheckReport = (LicenseCheckReport) o;
        if (licenseCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), licenseCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LicenseCheckReport{" +
            "id=" + getId() +
            ", licenseVerified='" + getLicenseVerified() + "'" +
            ", licRegistrationNumber='" + getLicRegistrationNumber() + "'" +
            ", licenseStatus='" + getLicenseStatus() + "'" +
            ", licVerifiedBy='" + getLicVerifiedBy() + "'" +
            ", licVerifiedDate='" + getLicVerifiedDate() + "'" +
            ", licRemarks='" + getLicRemarks() + "'" +
            "}";
    }
}
