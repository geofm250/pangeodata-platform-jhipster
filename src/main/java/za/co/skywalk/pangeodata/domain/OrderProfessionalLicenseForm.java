package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OrderProfessionalLicenseForm.
 */
@Document(collection = "order_professional_license_form")
public class OrderProfessionalLicenseForm implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name_of_license")
    private String nameOfLicense;

    @Field("town")
    private String town;

    @Field("license_institution")
    private String licenseInstitution;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNameOfLicense() {
        return nameOfLicense;
    }

    public OrderProfessionalLicenseForm nameOfLicense(String nameOfLicense) {
        this.nameOfLicense = nameOfLicense;
        return this;
    }

    public void setNameOfLicense(String nameOfLicense) {
        this.nameOfLicense = nameOfLicense;
    }

    public String getTown() {
        return town;
    }

    public OrderProfessionalLicenseForm town(String town) {
        this.town = town;
        return this;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getLicenseInstitution() {
        return licenseInstitution;
    }

    public OrderProfessionalLicenseForm licenseInstitution(String licenseInstitution) {
        this.licenseInstitution = licenseInstitution;
        return this;
    }

    public void setLicenseInstitution(String licenseInstitution) {
        this.licenseInstitution = licenseInstitution;
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
        OrderProfessionalLicenseForm orderProfessionalLicenseForm = (OrderProfessionalLicenseForm) o;
        if (orderProfessionalLicenseForm.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderProfessionalLicenseForm.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderProfessionalLicenseForm{" +
            "id=" + getId() +
            ", nameOfLicense='" + getNameOfLicense() + "'" +
            ", town='" + getTown() + "'" +
            ", licenseInstitution='" + getLicenseInstitution() + "'" +
            "}";
    }
}
