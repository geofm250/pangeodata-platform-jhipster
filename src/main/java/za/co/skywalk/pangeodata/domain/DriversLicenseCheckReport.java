package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DriversLicenseCheckReport.
 */
@Document(collection = "drivers_license_check_report")
public class DriversLicenseCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("drivers_license_verified")
    private String driversLicenseVerified;

    @Field("drivers_license_number")
    private String driversLicenseNumber;

    @Field("drivers_license_status")
    private String driversLicenseStatus;

    @Field("driver_license_verified_by")
    private String driverLicenseVerifiedBy;

    @Field("drivers_license_verified_date")
    private String driversLicenseVerifiedDate;

    @Field("drivers_license_remarks")
    private String driversLicenseRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDriversLicenseVerified() {
        return driversLicenseVerified;
    }

    public DriversLicenseCheckReport driversLicenseVerified(String driversLicenseVerified) {
        this.driversLicenseVerified = driversLicenseVerified;
        return this;
    }

    public void setDriversLicenseVerified(String driversLicenseVerified) {
        this.driversLicenseVerified = driversLicenseVerified;
    }

    public String getDriversLicenseNumber() {
        return driversLicenseNumber;
    }

    public DriversLicenseCheckReport driversLicenseNumber(String driversLicenseNumber) {
        this.driversLicenseNumber = driversLicenseNumber;
        return this;
    }

    public void setDriversLicenseNumber(String driversLicenseNumber) {
        this.driversLicenseNumber = driversLicenseNumber;
    }

    public String getDriversLicenseStatus() {
        return driversLicenseStatus;
    }

    public DriversLicenseCheckReport driversLicenseStatus(String driversLicenseStatus) {
        this.driversLicenseStatus = driversLicenseStatus;
        return this;
    }

    public void setDriversLicenseStatus(String driversLicenseStatus) {
        this.driversLicenseStatus = driversLicenseStatus;
    }

    public String getDriverLicenseVerifiedBy() {
        return driverLicenseVerifiedBy;
    }

    public DriversLicenseCheckReport driverLicenseVerifiedBy(String driverLicenseVerifiedBy) {
        this.driverLicenseVerifiedBy = driverLicenseVerifiedBy;
        return this;
    }

    public void setDriverLicenseVerifiedBy(String driverLicenseVerifiedBy) {
        this.driverLicenseVerifiedBy = driverLicenseVerifiedBy;
    }

    public String getDriversLicenseVerifiedDate() {
        return driversLicenseVerifiedDate;
    }

    public DriversLicenseCheckReport driversLicenseVerifiedDate(String driversLicenseVerifiedDate) {
        this.driversLicenseVerifiedDate = driversLicenseVerifiedDate;
        return this;
    }

    public void setDriversLicenseVerifiedDate(String driversLicenseVerifiedDate) {
        this.driversLicenseVerifiedDate = driversLicenseVerifiedDate;
    }

    public String getDriversLicenseRemarks() {
        return driversLicenseRemarks;
    }

    public DriversLicenseCheckReport driversLicenseRemarks(String driversLicenseRemarks) {
        this.driversLicenseRemarks = driversLicenseRemarks;
        return this;
    }

    public void setDriversLicenseRemarks(String driversLicenseRemarks) {
        this.driversLicenseRemarks = driversLicenseRemarks;
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
        DriversLicenseCheckReport driversLicenseCheckReport = (DriversLicenseCheckReport) o;
        if (driversLicenseCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), driversLicenseCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DriversLicenseCheckReport{" +
            "id=" + getId() +
            ", driversLicenseVerified='" + getDriversLicenseVerified() + "'" +
            ", driversLicenseNumber='" + getDriversLicenseNumber() + "'" +
            ", driversLicenseStatus='" + getDriversLicenseStatus() + "'" +
            ", driverLicenseVerifiedBy='" + getDriverLicenseVerifiedBy() + "'" +
            ", driversLicenseVerifiedDate='" + getDriversLicenseVerifiedDate() + "'" +
            ", driversLicenseRemarks='" + getDriversLicenseRemarks() + "'" +
            "}";
    }
}
